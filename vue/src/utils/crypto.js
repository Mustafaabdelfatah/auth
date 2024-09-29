import CryptoJS from 'crypto-js'

const secretKey = 'test' // Use a strong secret key

export function encrypt(data) {
  const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString()
  return ciphertext
}

export function decrypt(ciphertext) {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey)
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  return decryptedData
}
