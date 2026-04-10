import { describe, it, expect } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useUserStore } from '@/store/modules/user'

describe('User Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('initializes with empty state', () => {
    const store = useUserStore()
    expect(store.token).toBe('')
    expect(store.userInfo).toBeNull()
  })
})
