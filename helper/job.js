const cron = require('node-cron');
const sequelize = require("../config/database");
const { QueryTypes, Sequelize } = require("sequelize");

module.exports = () => {
    // cron.schedule('* * * * * *', async() => {
    cron.schedule('0 5 * * *', async () => {
        try {
            
         const data = await sequelize.query(
          "UPDATE school_payment SET membership = 'EXPIRED' WHERE transaction_date < NOW();",
          {

            type: QueryTypes.UPDATE,
          }
            );
            
        console.log('Payment statuses updated successfully.');
    } catch (error) {
        console.error('Error updating payment statuses:', error);
    }
    }, {
        scheduled: true,
        timezone: 'Asia/Kolkata' // Setting timezone to 'Asia/Kolkata'
    });
};
