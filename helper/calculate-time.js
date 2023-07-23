const { toSeconds } = require("./time");

exports.calculaTimeDiff = (start, end) => {
  start = new Date(start);
  end = new Date(end);
  return toSeconds(start) - toSeconds(end);
};
