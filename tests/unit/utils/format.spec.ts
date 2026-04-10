import { describe, it, expect } from 'vitest'
import { formatDate } from '@/utils/format/date'

describe('formatDate', () => {
  it('formats date correctly', () => {
    const result = formatDate(new Date('2024-01-15T10:30:00'), 'YYYY-MM-DD')
    expect(result).toBe('2024-01-15')
  })
})
