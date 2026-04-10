import CryptoJS from 'crypto-js'

const SECRET_KEY = import.meta.env.VITE_TOKEN_SECRET || 'default-secret-key'

/**
 * AES 加密
 */
export function encryptAES(data: string): string {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString()
}

/**
 * AES 解密
 */
export function decryptAES(encrypted: string): string | null {
  try {
    const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY)
    return bytes.toString(CryptoJS.enc.Utf8)
  } catch {
    return null
  }
}
