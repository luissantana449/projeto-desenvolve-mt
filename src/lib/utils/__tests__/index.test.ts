import { cn, formatDate, getTimeSince } from '../index'

describe('Utils', () => {
  describe('cn', () => {
    it('combines classes correctly', () => {
      expect(cn('bg-red-500', 'text-white')).toBe('bg-red-500 text-white')
    })

    it('handles conflicting Tailwind classes', () => {
      expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500')
    })
  })

  describe('formatDate', () => {
    it('formats date string correctly', () => {
      const result = formatDate('2023-01-15')
      expect(result).toContain('janeiro de 2023')
    })
  })

  describe('getTimeSince', () => {
    it('returns "Hoje" for today', () => {
      const today = new Date()
      expect(getTimeSince(today)).toBe('Hoje')
    })

    it('returns days ago for recent dates', () => {
      const threeDaysAgo = new Date()
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3)
      expect(getTimeSince(threeDaysAgo)).toBe('3 dias atrás')
    })
  })
})