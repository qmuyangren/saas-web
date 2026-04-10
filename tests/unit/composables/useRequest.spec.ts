import { describe, it, expect } from 'vitest'
import { useRequest } from '@/composables/useRequest'

describe('useRequest', () => {
  it('returns loading state', async () => {
    const fn = async () => 'result'
    const { loading, data, run } = useRequest(fn, false)
    expect(loading.value).toBe(false)
    await run()
    expect(data.value).toBe('result')
    expect(loading.value).toBe(false)
  })
})
