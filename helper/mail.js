// const nodemailer = require("nodemailer");

// const { EMAIL, PASS } = require("../../utils/Constant");

// const transporter = nodemailer.createTransport({
//   host: "smtp.hostinger.in",
//   port: 587,
//   secure: false,
//   auth: {
//     user: EMAIL,
//     pass: PASS,
//   },
// });

// transporter.verify((error) => {
//   if (error) console.error(error);
//   else console.log(`Success`);
// });

// module.exports = {
//   sendMail: async (recipient, subject, body) => {
//     try {
//       let options = {
//         from: `FITSAPP ${EMAIL}`, // sender address
//         to: recipient, // list of receivers
//         priority: "high",
//         subject: subject,
//         html: body,
//       };

//       if (recipient !== "" && subject !== "" && body !== "") {
//         transporter.sendMail(options, (error, info) => {
//           if (error) console.error(error);

//           console.log(info.messageId);
//         });
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   },
//   sendReport: async (recipient) => {
//     try {
//       let transporter = nodemailer.createTransport({
//         host: "smtp.hostinger.in",
//         port: 587,
//         secure: false,
//         auth: {
//           user: email,
//           pass: pass,
//         },
//       });

//       transporter.verify((error) => {
//         if (error) console.error(error);
//         else console.log(`Success`);
//       });

//       let options = {
//         from: `"DST" ${email}`, // sender address
//         to: recipient, // list of receivers
//         priority: "high",
//         subject: "Reports",
//         html: `<h4>Please find in the reports in the below attachments</h4>`,
//         attachments: [
//           {
//             // filename and content type is derived from path
//             path: "../public/pdf/Report.pdf",
//           },
//         ],
//       };

//       transporter.sendMail(options, (error, info) => {
//         if (error) console.error(error);

//         console.log(info.messageId);
//       });

//       // console.log("Message sent: %s", info.messageId);
//     } catch (error) {
//       console.error(error);
//     }
//   },
// };

const nodemailer = require('nodemailer');

// Create a function to send an email
const sendEmail = async (to, subject, text)=>{
    // Create a transporter using SMTP transport
    let transporter = nodemailer.createTransport({
     
      host: "smtp.ethereal.email",
        port: 587,
       
        auth: {
          user: 'serena.emmerich@ethereal.email',
        pass: 'B9yX28zGgaZuTSRV1K'
        }
    });

    // Define email options
    let mailOptions = {
        from: 'prabhatpandey181291@gmail.com',
        to: to,
        subject: subject,
        text: text
    };

    // Send email
    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return true; // Email sent successfully
    } catch (error) {
        console.error('Error sending email:', error);
        return false; // Failed to send email
    }
}

const nodemailer = require('nodemailer');

// Configure Nodemailer to use Amazon SES SMTP
const transporter = nodemailer.createTransport({
    host: 'email-smtp.us-east-1.amazonaws.com', // replace with your SES SMTP endpoint
    port: 587, // use 587 for TLS
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'your_smtp_username', // replace with your SMTP username
        pass: 'your_smtp_password'  // replace with your SMTP password
    }
});

// Define email options
const mailOptions = {
    from: 'your_verified_email@example.com',
    to: 'recipient_email@example.com',
    subject: 'Test Email from SES and Nodemailer with SMTP',
    text: 'This is a test email sent using Amazon SES and Nodemailer with SMTP.',
    html: '<p>This is a test email sent using Amazon SES and Nodemailer with SMTP.</p>'
};

// Send email
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log('Error sending email:', error);
    } else {
        console.log('Email sent successfully:', info);
    }
});

module.exports={sendEmail}