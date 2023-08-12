const crypto = require("crypto");
const forge = require("node-forge");
const fs = require("fs");
const path = require("path");

module.exports = {
  encryptedPassword: (password) => {
    try {
      const shasum = crypto.createHash("sha1");
      const data = shasum.update(password);

      const enc = data.digest("hex");

      return enc;
    } catch (error) {
      console.error(error);
      return 0;
    }
  },
  hashGenerator: async (USERNAME, SENDERID, messgae, KEY) => {
    try {
      const hash = crypto.createHash("sha512");
      const data = hash.update(`${USERNAME}${SENDERID}${messgae}${KEY}`);
      const gen_hash = data.digest("hex");
      console.log("hash : " + gen_hash);

      return gen_hash;
    } catch (error) {
      console.error(error);
      return 0;
    }
  },
  encryptUsingPublicKey: function (data) {
    let pem = fs.readFileSync(path.join(__dirname, "./uidai_auth_prod.cer"));
    let UIDAI_CERTIFICATE = forge.pki.certificateFromPem(pem);
    let publicKey = UIDAI_CERTIFICATE.publicKey;
    //RSAES/PKCS1-V1_5
    let encrypted = publicKey.encrypt(data);
    return encrypted;
  },
  encode64: function (bytes) {
    return forge.util.encode64(bytes);
  },
  encryptUsingSessionKey: function (data, ts, key, prependTs) {
    //AES-256/GCM
    let tsLast12Bytes = Buffer.from(ts).slice(-12);
    let tsLast16Bytes = Buffer.from(ts).slice(-16);

    let cipher = forge.cipher.createCipher("AES-GCM", key);
    cipher.start({
      iv: tsLast12Bytes,
      additionalData: tsLast16Bytes,
    });
    cipher.update(forge.util.createBuffer(data));
    cipher.finish();
    let encrypted = cipher.output;
    let tag = cipher.mode.tag;
    encrypted.putBytes(tag.getBytes());

    let encryptedBytes = encrypted.getBytes();
    if (prependTs) {
      let tsPrependedEncry = Buffer.concat([
        Buffer.from(ts),
        Buffer.from(encryptedBytes, "binary"),
      ]);
      return tsPrependedEncry.toString("binary");
    }
    return encryptedBytes;
  },
  generateSha256Hash: function (data) {
    let hash = forge.md.sha256.create();
    hash.update(data);
    return hash.digest().getBytes();
  },
  convertUniTest: function (message, lang = "hindi_2304") {
    var uniText = message;
    uniText = uniText.replace(/^\s+|\s+$/g, "");

    uniTxt = uniText.replace(/^\s+|\s+$/g, ""); //get the value from source field name

    if (uniTxt.length <= 0) return;

    var lg = lang.substring(0, lang.indexOf("_"));

    arrayN = new Array(
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F"
    );
    arrayH = new Array("90", "91", "92", "93", "94", "95", "96", "97");
    arrayT = new Array("90", "91", "92", "93", "94", "95", "96", "97");

    if (lg == "bangla")
      arrayT = new Array("98", "99", "9A", "9B", "9C", "9D", "9E", "9F");
    else if (lg == "gurmukhi")
      arrayT = new Array("A0", "A1", "A2", "A3", "A4", "A5", "A6", "A7");
    else if (lg == "gujarati")
      arrayT = new Array("A8", "A9", "AA", "AB", "AC", "AD", "AE", "AF");
    else if (lg == "oriya")
      arrayT = new Array("B0", "B1", "B2", "B3", "B4", "B5", "B6", "B7");
    else if (lg == "tamil")
      arrayT = new Array("B8", "B9", "BA", "BB", "BC", "BD", "BE", "BF");
    else if (lg == "telugu")
      arrayT = new Array("C0", "C1", "C2", "C3", "C4", "C5", "C6", "C7");
    else if (lg == "kannada")
      arrayT = new Array("C8", "C9", "CA", "CB", "CC", "CD", "CE", "CF");
    else if (lg == "malayalam")
      arrayT = new Array("D0", "D1", "D2", "D3", "D4", "D5", "D6", "D7");

    for (var i = 0; i < arrayT.length; i++) {
      for (var j = 0; j < arrayN.length; j++) {
        var source = "\\u0" + arrayT[i] + arrayN[j];
        var num = "0" + arrayH[i] + arrayN[j];
        var uni = '"\\u' + num + '"';
        var rx = new RegExp(source, "g");
        uniTxt = uniTxt.replace(rx, eval(uni));
      }
    }

    line = uniTxt.split(" ");
    var rt = "";
    var i = 0;
    var vowel = "aAeEiIoOuU";
    var number = "0123456789";

    while (i < line.length) {
      u2r_unicode = line[i];
      u2r_unicode = u2r_unicode.replace(/^\s+|\s+$/g, "");
      var rupantar = "";

      while (true) {
        var akshar = u2r_getAkshar();
        var matra = u2r_getMatra();

        var aksU = "";
        var matU = "";

        if (akshar.replace(/^\s+|\s+$/g, "").length > 0)
          aksU = u2r_getRupA(akshar);
        if (matra.replace(/^\s+|\s+$/g, "").length > 0)
          matU = u2r_getRupM(matra);
        else {
          if (
            aksU.length > 0 &&
            vowel.indexOf(aksU.charAt(aksU.length - 1)) < 0
          )
            matU = "a";
          if (
            aksU.length > 0 &&
            number.indexOf(aksU.charAt(aksU.length - 1)) >= 0
          )
            matU = "";
        }

        rupantar += aksU + "" + matU;

        if (u2r_unicode.replace(/^\s+|\s+$/g, "").length < 1) {
          break;
        }
      }
      rt = rt + " " + rupantar;
      i++;
    }
    return rt.replace(/^\s+|\s+$/g, ""); // set the value to target field name
  },
};
