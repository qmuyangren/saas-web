import { TOKEN_KEY, USER_INFO_KEY, MENU_LIST_KEY, PROJECT_CONFIG_KEY, LANG_KEY } from '@/constants'

const localStorageKeyMap = [
  TOKEN_KEY,
  USER_INFO_KEY,
  MENU_LIST_KEY,
  PROJECT_CONFIG_KEY,
  LANG_KEY,
]

export class Persistent {
  static getLocal<T>(key: string): T | null {
    const value = localStorage.getItem(key)
    if (!value) return null
    try {
      return JSON.parse(value) as T
    } catch (e) {
      return null
    }
  }

  static setLocal(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value))
  }

  static removeLocal(key: string): void {
    localStorage.removeItem(key)
  }

  static clearLocal(key: string): void {
    localStorage.removeItem(key)
  }

  static clearAll(): void {
    localStorageKeyMap.forEach(key => {
      localStorage.removeItem(key)
    })
  }
}
