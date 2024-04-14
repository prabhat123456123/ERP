const { toSeconds } = require("./time");

exports.calculaTimeDiff = (start, end) => {
  start = new Date(start);
  end = new Date(end);
  return toSeconds(start) - toSeconds(end);
};

 exports.calculateNextDateTime = (startDateTime, interval) =>{
    let nextDateTime;

    switch (interval) {
        case 'monthly':
            nextDateTime = new Date(startDateTime);
            nextDateTime.setMonth(nextDateTime.getMonth() + 1);
            break;
        case 'quarterly':
            nextDateTime = new Date(startDateTime);
            nextDateTime.setMonth(nextDateTime.getMonth() + 3);
            break;
        case 'halfyearly':
            nextDateTime = new Date(startDateTime);
            nextDateTime.setMonth(nextDateTime.getMonth() + 6);
            break;
        case 'yearly':
            nextDateTime = new Date(startDateTime);
            nextDateTime.setFullYear(nextDateTime.getFullYear() + 1);
            break;
        default:
            throw new Error('Invalid interval');
    }

    return nextDateTime;
}