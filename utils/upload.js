const util = require("util");
const fs = require("fs");
const sequelize = require("../config/db");
const { QueryTypes } = require("sequelize");
const formidable = require("formidable");
const copyFilePromise = util.promisify(fs.copyFile);
const { ErrorHandler, statusCodes } = require("../helper");
const { v4: uuidv4 } = require("uuid");
const humps = require("humps");
const path = require("path");
const NodeClam = require("clamscan");
const constant = require("./constant");
const { SERVER_ERROR, BAD_GATEWAY } = statusCodes;
const { getDate } = require("./time");
const { ACTIVE, INACTIVE, SUCCESS, OTP_VERIFIED, INVALID_OTP } = constant;
const BASEURL = process.env.BASEURL;
const archiver = require("archiver");

let scanFile = async filePath => {
	if (process.env.VIRUS_CHECKER == "OFF") return true;
	const clamscan = await new NodeClam().init({
		remove_infected: true,
		debug_mode: false,
		scan_recursively: false,
		clamdscan: {
			socket: process.env.CLAMDSCAN_SOCKET || "/var/run/clamav/clamd.ctl",
			timeout: 120000,
			local_fallback: true,
			path: process.env.CLAMDSCAN_PATH || "/var/lib/clamav",
			config_file: process.env.CLAMDSCAN_CONFIG_FILE || "/etc/clamav/clamd.conf",
		},
	});

	const { is_infected, viruses } = await clamscan.scan_file(filePath);

	if (is_infected) {
		console.error(`Virus scan failed, file INFECTED`, { filePath, viruses });
	} else {
		console.log(`Virus scan OK`, { filePath });
	}

	return is_infected;
};

const copyFiles = (srcDir, destDir, dir) => {
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, { recursive: true });
	}
	return copyFilePromise(srcDir, destDir);
};

const formidableUpload = async req => {
	try {
		const form = new formidable.IncomingForm();
		form.keepExtensions = true;
		form.multiples = true;
		const formfields = await new Promise(function (resolve, reject) {
			form.parse(req, function (err, fields, files) {
				if (err) {
					reject(err);
					return;
				}

				resolve({ fields, files });
			}); // form.parse
		});
		return formfields;
	} catch (error) {
		throw error;
	}
};
console.log("servicesDocuments", process.env.TEMP_DOCUMENT_URL);

const fetchServiceDocuments = async (applicationId, serviceType) => {
	try {
		let servicesDocuments = await sequelize.query(
			"SELECT * FROM `service_documents` where " + "service_id=? and is_active='Yes'",
			{
				replacements: [serviceType],
				type: QueryTypes.SELECT,
			}
		);

		console.log("servicesDocuments", process.env.TEMP_DOCUMENT_URL);

		for (let doc of servicesDocuments) {
			doc.uploadedFiles = await sequelize.query(
				"SELECT *, CASE WHEN created_by like '%Migration%' THEN CONCAT(?, document_url,'&FileName=',m_FileName) ELSE document_url END as document_url FROM `uploaded_documents` where application_id=?" +
					" and service_type=? and services_document_id=?",
				{
					replacements: [
						process.env.TEMP_DOCUMENT_URL,
						applicationId,
						serviceType,
						doc.services_document_id,
					],
					type: QueryTypes.SELECT,
				}
			);
		}

		return servicesDocuments;
	} catch (error) {
		throw new ErrorHandler(SERVER_ERROR, error);
	}
};

const randomUpload = async (files, body, key = "document") => {
	try {

		if (!fs.existsSync(`./public/uploads/${body.investorId}/${body.serviceType}`)) {
			fs.mkdirSync(`./public/uploads/${body.investorId}/${body.serviceType}`, { recursive: true });
		}

		const dir = path.join(`./public/uploads/${body.investorId}/${body.serviceType}`);
		let fileName = new Date().toISOString().replace(/:/g, "-").replace(/[^a-z0-9]/gi, '_').toLowerCase() + path.extname(files[key].originalFilename);

		copyFiles(files[key].filepath, `${dir}/${fileName}`, dir);

		const url = `${BASEURL}/uploads/${body.investorId}/${body.serviceType}/${fileName}`;

		return {
			message: SUCCESS,
			url: url,
			name: fileName,
		};
	} catch (error) {
		throw new ErrorHandler(SERVER_ERROR, error);
	}
};

const uploadDocument = async (files, body, key = "document", serviceDocumentDetails = null) => {
	try {
		let { applicationId, serviceType, serviceDocumentId, documentId } = body;

		if (!serviceDocumentDetails) {
			serviceDocumentDetails = await sequelize.query(
				"SELECT * FROM `service_documents` where " +
					"service_id=? and is_active='Yes' and services_document_id=?",
				{
					replacements: [serviceType, serviceDocumentId],
					type: QueryTypes.SELECT,
				}
			);

			if (serviceDocumentDetails.length == 0)
				throw new ErrorHandler(SERVER_ERROR, "Wrong Service Document Id");
			else {
				serviceDocumentDetails = serviceDocumentDetails[0];
			}
		}

		const uuid = uuidv4(),
			createdDate = getDate("YYYY-MM-DD HH:mm:ss");

		if (!fs.existsSync(`./public/uploads/${body.investorId}/${serviceType}`)) {
			fs.mkdirSync(`./public/uploads/${body.investorId}/${serviceType}`, { recursive: true });
		}

		const dir = path.join(`./public/uploads/${body.investorId}/${serviceType}`);
		let fileName =
			serviceDocumentDetails.document_name.replace(/\s/g, "-") +
			"-" +
			new Date().toISOString().replace(/:/g, "-");
		fileName =
			fileName.replace(/[^a-z0-9]/gi, "_").toLowerCase() +
			path.extname(files[key].originalFilename);
		if (files[key].size > serviceDocumentDetails.file_size_in_mb * 1024 * 1024)
			throw new ErrorHandler(
				SERVER_ERROR,
				"File Larger Than Allowed Limit " + "For This Document"
			);

		if (!scanFile(files[key].filepath)) throw new ErrorHandler(SERVER_ERROR, "Virus Found");

		copyFiles(files[key].filepath, `${dir}/${fileName}`, dir);

		const url = `${BASEURL}/uploads/${body.investorId}/${serviceType}/${fileName}`;

		if (documentId) {
			await sequelize.query(
				`UPDATE uploaded_documents set document_url = ?` +
					`WHERE document_id=? AND application_id=? AND service_type=? ` +
					`AND services_document_id=?`,
				{
					type: QueryTypes.UPDATE,
					replacements: [url, documentId, applicationId, serviceType, serviceDocumentId],
				}
			);
		} else {
			if (serviceDocumentDetails.can_be_multiple == "No") {
				await sequelize.query(
					`DELETE FROM uploaded_documents	WHERE services_document_id=?` +
						` AND application_id = ? AND service_type=?`,
					{
						type: QueryTypes.INSERT,
						replacements: [serviceDocumentId, applicationId, serviceType],
					}
				);
			}
			await sequelize.query(
				`INSERT INTO uploaded_documents	(document_id, application_id, ` +
					`service_type, services_document_id, document_url, status,` +
					` created_by, created_date) VALUES (?,?,?,?,?,?,?,?)`,
				{
					type: QueryTypes.INSERT,
					replacements: [
						uuid,
						applicationId,
						serviceType,
						serviceDocumentId,
						url,
						ACTIVE,
						body.investorId,
						createdDate,
					],
				}
			);
		}

		return {
			message: SUCCESS,
			url: url,
			documentId: uuid,
			name: serviceDocumentDetails.document_name + path.extname(files[key].originalFilename),
		};
	} catch (error) {
		throw new ErrorHandler(SERVER_ERROR, error);
	}
};

let multiFileDownload = async (body, user, archive = null) => {
	let files = await sequelize.query(
		"SELECT * FROM `uploaded_documents` where " +
			"application_id = ? and service_type = ? and created_by=?",
		{
			replacements: [body.applicationId, body.serviceType, user.investorId],
			type: QueryTypes.SELECT,
		}
	);

	if (!archive) {
		archive = archiver("zip");
		archive.on("error", function (err) {
			throw new ErrorHandler(SERVER_ERROR, err);
		});

		archive.on("warning", function (err) {
			console.log(err);
		});

		archive.on("end", function () {
			console.log("Archive wrote %d bytes", archive.pointer());
		});
	}

	for (let file of files) {
		let file_path = file.document_url.replace(BASEURL, "./public");
		archive.file(path.resolve(file_path), { name: path.basename(path.resolve(file_path)) });
	}

	return archive;
};

let serviceSingleDocUploadUtil = async (req, serviceType,ignore=false) => {
	try {
		const form = new formidable.IncomingForm();
		form.keepExtensions = true;
		form.multiples = true;
		let serviceDocumentId = null;
		let serviceDocumentDetails = null;

		if(!ignore){
		form.on("field", async (fieldName, fieldValue) => {
			if (fieldName == "serviceDocumentId") {
				serviceDocumentId = fieldValue;
				serviceDocumentDetails = await sequelize.query(
					"SELECT * FROM `service_documents` where " +
						"service_id=? and is_active='Yes' and services_document_id=?",
					{
						replacements: [serviceType, serviceDocumentId],
						type: QueryTypes.SELECT,
					}
				);

				if (serviceDocumentDetails.length == 0)
					throw new ErrorHandler(SERVER_ERROR, "Wrong serviceDocumentId");
				serviceDocumentDetails = serviceDocumentDetails[0];
				form.options.maxFileSize = serviceDocumentDetails.file_size_in_mb * 1024 * 1024;
			}
		});
		}

		const formFields = await new Promise(function (resolve, reject) {
			form.parse(req, function (err, fields, files) {
				if (err) {
					reject(err);
					return;
				}

				resolve({ fields, files });
			}); // form.parse
		});
		return formFields;
	} catch (error) {
		if (error.code == 1009 && error.httpCode == 413) {
			throw new ErrorHandler(
				SERVER_ERROR,
				"File Larger Than Allowed Limit " + "For This Document"
			);
		}
		throw new ErrorHandler(SERVER_ERROR, error);
	}
};

module.exports = {
	fetchServiceDocuments,
	formidableUpload,
	randomUpload,
	scanFile,
	uploadDocument,
	copyFiles,
	multiFileDownload,
	serviceSingleDocUploadUtil
};
