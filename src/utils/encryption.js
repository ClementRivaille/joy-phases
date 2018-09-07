import CryptoJS from 'crypto-js';

const CRYPT_KEY = '123joyphaseskey123';

export function decrypt(hash) {
  // Decrypt data
  const bytes = CryptoJS.AES.decrypt(hash, CRYPT_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

export function encrypt(object) {
  return CryptoJS.AES.encrypt(JSON.stringify(object), CRYPT_KEY).toString();
}
