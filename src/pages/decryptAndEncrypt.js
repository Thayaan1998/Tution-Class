function decryptPassword(password){
    
    // LOAD ENCRYPT LIBRARY
    const CryptoJS = require("crypto-js");

    // SECRET KEY
    var key = "ASECRET";

    // DECRYPT
    var decipher = CryptoJS.AES.decrypt(password, key);
    decipher = decipher.toString(CryptoJS.enc.Utf8);
    // console.log(decipher);

    return decipher
}
function encryptPassword(password){
    
    // (A) LOAD ENCRYPT LIBRARY
    const CryptoJS = require("crypto-js");

    // (B) SECRET KEY
    var key = "ASECRET";

    // (C) ENCRYPT
    var cipher = CryptoJS.AES.encrypt(password, key);
    cipher = cipher.toString();
    // console.log(cipher);

    // (D) DECRYPT
    // var decipher = CryptoJS.AES.decrypt(cipher, key);
    // decipher = decipher.toString(CryptoJS.enc.Utf8);
    // console.log(decipher);

    return cipher
}
module.exports.encryptPassword=encryptPassword;

module.exports.decryptPassword=decryptPassword;