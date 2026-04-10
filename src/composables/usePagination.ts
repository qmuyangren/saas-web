import { ref, computed } from 'vue'

export function usePagination<T = any>(options: {
  fetchFn: (params: any) => Promise<{ list: T[]; total: number }>
  defaultPage?: number
  defaultPageSize?: number
} = {} as any) {
  const { fetchFn, defaultPage = 1, defaultPageSize = 20 } = options

  const list = ref<T[]>([]) as any
  const loading = ref(false)
  const current = ref(defaultPage)
  const pageSize = ref(defaultPageSize)
  const total = ref(0)

  const totalPages = computed(() => Math.ceil(total.value / pageSize.value))

  const fetch = async (params: any = {}) => {
    loading.value = true
    try {
      const res = await fetchFn({
        page: current.value,
        pageSize: pageSize.value,
        ...params,
      })
      list.value = res.list
      total.value = res.total
    } finally {
      loading.value = false
    }
  }

  const onPageChange = (page: number) => {
    current.value = page
    fetch()
  }

  const onPageSizeChange = (_: number, size: number) => {
    pageSize.value = size
    current.value = 1
    fetch()
  }

  const reload = () => {
    current.value = 1
    fetch()
  }

  return {
    list,
    loading,
    current,
    pageSize,
    total,
    totalPages,
    fetch,
    onPageChange,
    onPageSizeChange,
    reload,
  }
}
