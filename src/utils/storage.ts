import { encryptAES, decryptAES } from './crypto'

const TOKEN_KEY = 'saas_token'

/**
 * Token 存储（AES 加密）
 */
export function setToken(token: string) {
  const encrypted = encryptAES(token)
  localStorage.setItem(TOKEN_KEY, encrypted)
}

export function getToken(): string | null {
  const encrypted = localStorage.getItem(TOKEN_KEY)
  if (!encrypted) return null
  return decryptAES(encrypted)
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY)
}

export const storage = {
  get<T = any>(key: string, defaultValue?: T): T | null {
    const item = localStorage.getItem(key)
    if (!item) return defaultValue ?? null
    try {
      return JSON.parse(item) as T
    } catch {
      return item as any
    }
  },

  set(key: string, value: any) {
    const toStore = typeof value === 'object' ? JSON.stringify(value) : value
    localStorage.setItem(key, toStore)
  },

  remove(key: string) {
    localStorage.removeItem(key)
  },

  clear() {
    localStorage.clear()
  },
}

export const session = {
  get<T = any>(key: string, defaultValue?: T): T | null {
    const item = sessionStorage.getItem(key)
    if (!item) return defaultValue ?? null
    try {
      return JSON.parse(item) as T
    } catch {
      return item as any
    }
  },

  set(key: string, value: any) {
    const toStore = typeof value === 'object' ? JSON.stringify(value) : value
    sessionStorage.setItem(key, toStore)
  },

  remove(key: string) {
    sessionStorage.removeItem(key)
  },
}
