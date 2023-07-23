const { notification } = require("../services/v2/helper/notifications");
const { messenger } = require("../services/v2/helper/message");
const { sendMail } = require("../services/v2/helper/mail");

module.exports = {
  notification_message_customer: async (
    messageTemplate,
    mailTemplate,
    notificationTemplate,
    data,
    DLT
  ) => {
    return new Promise(function (resolve, reject) {
      messenger(
        messageTemplate,
        process.env.NODE_ENV === "PROD"
          ? data.customerdetails[0].MobileNumber
          : 9199104102,
        DLT,
        function (err, send) {
          if (err) {
            reject(err);
          } else {
            resolve(send);
          }
        }
      );

      sendMail(
        process.env.NODE_ENV === "PROD"
          ? data.customerdetails[0].EmailID
          : "vibhor@codebuckets.in",
        mailTemplate.sub,
        mailTemplate.body,
        function (err, send) {
          if (err) {
            reject(err);
          } else {
            resolve(send);
          }
        }
      );
      notification(
        notificationTemplate.type,
        notificationTemplate.senderId,
        notificationTemplate.customerTemp,
        notificationTemplate.sub,
        function (err, send) {
          if (err) {
            reject(err);
          } else {
            resolve(send);
          }
        }
      );
    });
  },
  notification_message_trainer: (
    messageTemplate,
    mailTemplate,
    notificationTemplate,
    data,
    DLT
  ) => {
    return new Promise(function (resolve, reject) {
      messenger(
        messageTemplate,
        process.env.NODE_ENV === "PROD"
          ? data.trainerdetails[0].MobileNumber
          : 9199104102,
        DLT,
        function (err, send) {
          if (err) {
            reject(err);
          } else {
            resolve(send);
          }
        }
      );

      sendMail(
        process.env.NODE_ENV === "PROD"
          ? data.trainerdetails[0].EmailID
          : "vibhor@codebuckets.in",
        mailTemplate.sub,
        mailTemplate.body,
        function (err, send) {
          if (err) {
            reject(err);
          } else {
            resolve(send);
          }
        }
      );
      notification(
        notificationTemplate.type,
        notificationTemplate.senderId,
        notificationTemplate.trainerTemp,
        notificationTemplate.sub,
        function (err, send) {
          if (err) {
            reject(err);
          } else {
            resolve(send);
          }
        }
      );
    });
  },
};
