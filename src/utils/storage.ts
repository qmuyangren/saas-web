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
