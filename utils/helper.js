// const camelcaseKeys = require("camelcase-keys");
// import camelcaseKeys from "camelcase-keys";

module.exports = {
  camelize: (obj) => {
    try {
      return camelcaseKeys(JSON.parse(JSON.stringify(obj)), { deep: true });
    } catch (error) {
      throw new ErrorHandler(500, error);
    }
  },
   titletoslug:(title)=>{
    return title.toLowerCase().replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
 
},
  generate: (lenght = 4) => {
    try {
      const string = "123456789";
      let OTP = "";
      const len = string.length;
      for (let i = 0; i < lenght; i++) {
        OTP += string[Math.floor(Math.random() * len)];
      }
      return OTP;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
