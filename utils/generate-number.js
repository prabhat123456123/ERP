module.exports = {
  generateRandomNumber: () => {
    var minm = 1000000000;
    var maxm = 9999999999;
    return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
  },
  generateRandomPassword: (length = 6) => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  },
};
