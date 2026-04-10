import { ref } from 'vue'

export function useCache(key: string, defaultValue?: any) {
  const data = ref<any>(defaultValue)

  const get = (): any => {
    const item = localStorage.getItem(key)
    if (item) {
      try {
        data.value = JSON.parse(item)
      } catch {
        data.value = item
      }
    }
    return data.value
  }

  const set = (value: any) => {
    data.value = value
    localStorage.setItem(key, JSON.stringify(value))
  }

  const remove = () => {
    data.value = undefined
    localStorage.removeItem(key)
  }

  get()
  return { data, get, set, remove }
}
