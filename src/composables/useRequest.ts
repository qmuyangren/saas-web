import { ref } from 'vue'

export function useRequest<T = any>(fn: () => Promise<T>, immediate = true) {
  const loading = ref(false)
  const data = ref<any>(null)
  const error = ref<Error | null>(null)

  const run = async () => {
    loading.value = true
    error.value = null
    try {
      data.value = await fn()
    } catch (e: any) {
      error.value = e
    } finally {
      loading.value = false
    }
    return data.value
  }

  if (immediate) {
    run()
  }

  return { loading, data, error, run }
}
