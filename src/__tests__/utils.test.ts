import { describe, it, expect } from 'vitest'
import { formatCents, slugify, cn } from '@/lib/utils'

describe('formatCents', () => {
  it('formats cents to dollar string', () => {
    expect(formatCents(1000)).toBe('$10.00')
    expect(formatCents(2599)).toBe('$25.99')
    expect(formatCents(0)).toBe('$0.00')
  })
})

describe('slugify', () => {
  it('converts text to kebab case', () => {
    expect(slugify('Hello World')).toBe('hello-world')
    expect(slugify('BBG All-Star Game 2024')).toBe('bbg-all-star-game-2024')
  })
})

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
    expect(cn('p-4', 'p-2')).toBe('p-2')
  })
})
