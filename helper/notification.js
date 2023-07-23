const sequelize = require("../../config/database");
const {
  customerfcmtoken,
  trainerfcmtoken,
  customernotificationlog,
  trainernotificationlog,
} = require("../../models/init-models")(sequelize);
const { GCMSENDER } = require("../../utils/Constant");
const gcm = require("node-gcm");

module.exports = {
  notification: async function (type, senderId, body, subject) {
    const sender = new gcm.Sender(GCMSENDER),
      CreatedDate = getDate("YYYY-MM-DD HH:mm:ss");

    let fcm = "";

    if (type === "customer") {
      fcm = await customerfcmtoken.findOne({
        where: {
          CustomerId: senderId[0],
          Status: 0,
        },
      });
      fcmAll = await customerfcmtoken.findAll({
        where: {
          CustomerId: {
            [Op.in]: [senderId],
          },
          Status: 0,
        },
      });
    } else if (type === "trainer") {
      fcm = await trainerfcmtoken.findOne({
        where: {
          TrainerID: senderId[0],
          Status: 0,
        },
      });
      fcmAll = await trainerfcmtoken.findAll({
        where: {
          TrainerID: {
            [Op.in]: [senderId],
          },
          Status: 0,
        },
      });
    }

    const message = new gcm.Message({
      notification: {
        title: subject,
        body: body,
      },
    });

    sender.send(
      message,
      {
        registrationTokens: fcm,
      },
      async function (error, response) {
        if (error) throw error;
        else {
          if (type === "customer") {
            await customernotificationlog.create({
              CustomerID: senderId,
              FCMTokenID: fcm,
              Subject: subject,
              Body: body,
              ChannelID: 3,
              status: 0,
              CreatedBy: senderId,
              CreatedDate: CreatedDate,
            });
            for (let i = 0; i < sender.length; i++) {
              await customernotificationlog.create({
                CustomerID: senderId[i],
                FCMTokenID: fcm,
                Subject: subject,
                Body: body,
                ChannelID: 3,
                status: 0,
                CreatedBy: senderId[i],
                CreatedDate: CreatedDate,
              });
            }
          } else if (type === "trainer") {
            await trainernotificationlog.create({
              TrainerID: senderId,
              FCMTokenID: fcm,
              Subject: subject,
              Body: body,
              ChannelID: 2,
              status: 0,
              CreatedBy: senderId,
              CreatedDate: CreatedDate,
            });

            for (let i = 0; i < sender.length; i++) {
              await trainernotificationlog.create({
                TrainerID: senderId[i],
                FCMTokenID: fcm,
                Subject: subject,
                Body: body,
                ChannelID: 2,
                status: 0,
                CreatedBy: senderId[i],
                CreatedDate: CreatedDate,
              });
            }
          }
        }
      }
    );
  },
};
