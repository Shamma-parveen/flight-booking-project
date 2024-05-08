import CryptoJS from "crypto-js";
const secretKey = "aLtAeNCrypT";
const encrypt = (text: string) => {
  return CryptoJS.AES.encrypt(text, secretKey).toString();
};
export { encrypt };
