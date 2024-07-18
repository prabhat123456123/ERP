// const http = require("http");

// const { AUTHKEY } = require("../../utils/Constant");

// module.exports = {
//   messenger: async (message, phone) => {
//     try {
//       console.log(message);
//       console.log(phone);
//       const msg = encodeURIComponent(message);
//       const url = `http://api.msg91.com/api/sendhttp.php?route=4&sender=TESTIN&mobiles=${phone}&authkey=${AUTHKEY}&message=${msg}`;

//       http
//         .get(url, function (resp) {
//           resp.on("data", function (chunk) {
//             console.log(chunk);
//           });
//         })
//         .on("error", function (e) {
//           console.log("Got error: " + e.message);
//         });
//     } catch (error) {
//       console.error(error);
//       return 0;
//     }
//   },
//   generate: (lenght = 4) => {
//     try {
//       const string = "123456789";
//       let OTP = "";
//       const len = string.length;
//       for (let i = 0; i < lenght; i++) {
//         OTP += string[Math.floor(Math.random() * len)];
//       }
//       return OTP;
//     } catch (error) {
//       console.error(error);
//       throw error;
//     }
//   },
//   getTemplate: async (
//     fitsapptemplate,
//     application,
//     TemplateCode,
//     app = "Customer"
//   ) => {
//     try {
//       const applicationId = await application.findOne({
//         where: {
//           Name: app,
//         },
//       });
//       const data = await fitsapptemplate.findOne({
//         where: {
//           Status: 0,
//           TemplateCode: TemplateCode,
//           ApplicationID: applicationId.dataValues.ApplicationID,
//         },
//       });
//       return data;
//     } catch (error) {
//       throw error;
//     }
//   },
//   getTrainerTemplate: async (
//     fitsapptemplate,
//     application,
//     TemplateCode,
//     app = "Trainer"
//   ) => {
//     try {
//       const applicationId = await application.findOne({
//         where: {
//           Name: app,
//         },
//       });
//       const data = await fitsapptemplate.findOne({
//         where: {
//           Status: 0,
//           TemplateCode: TemplateCode,
//           ApplicationID: applicationId.dataValues.ApplicationID,
//         },
//       });
//       return data;
//     } catch (error) {
//       throw error;
//     }
//   },
//   getCustomerTemplate: async (
//     fitsapptemplate,
//     application,
//     TemplateCode,
//     app = "Customer"
//   ) => {
//     try {
//       const applicationId = await application.findOne({
//         where: {
//           Name: app,
//         },
//       });
//       const data = await fitsapptemplate.findOne({
//         where: {
//           Status: 0,
//           TemplateCode: TemplateCode,
//           ApplicationID: applicationId.dataValues.ApplicationID,
//         },
//       });
//       return data;
//     } catch (error) {
//       throw error;
//     }
//   },
// };

// const AWS = require('aws-sdk');

// // Update AWS configuration
// AWS.config.update({
//   accessKeyId: 'your_access_key_id',
//   secretAccessKey: 'your_secret_access_key',
//   region: 'your_region'
// });

// // Create SNS service object
// const sns = new AWS.SNS();
// const params = {
//   Message: 'Hello, this is a test SMS!', // Message to send
//   PhoneNumber: '+1234567890' // Phone number in E.164 format
// };

// sns.publish(params, (err, data) => {
//   if (err) {
//     console.error("Error sending SMS:", err);
//   } else {
//     console.log("SMS sent:", data);
//   }
// });
