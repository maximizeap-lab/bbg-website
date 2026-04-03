import { describe, it, expect } from 'vitest'
import { donationSchema, contactSchema, newsletterSchema } from '@/lib/validations'

describe('donationSchema', () => {
  it('validates a valid donation', () => {
    const result = donationSchema.safeParse({
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
      amount_cents: 2500,
    })
    expect(result.success).toBe(true)
  })

  it('rejects missing email', () => {
    const result = donationSchema.safeParse({
      first_name: 'John',
      last_name: 'Doe',
      amount_cents: 2500,
    })
    expect(result.success).toBe(false)
  })

  it('rejects amount below minimum', () => {
    const result = donationSchema.safeParse({
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
      amount_cents: 50,
    })
    expect(result.success).toBe(false)
  })
})

describe('contactSchema', () => {
  it('validates a valid contact submission', () => {
    const result = contactSchema.safeParse({
      name: 'Jane Doe',
      email: 'jane@example.com',
      subject: 'Question',
      message: 'I have a question about registering.',
    })
    expect(result.success).toBe(true)
  })

  it('rejects short message', () => {
    const result = contactSchema.safeParse({
      name: 'Jane',
      email: 'jane@example.com',
      subject: 'Hi',
      message: 'Short',
    })
    expect(result.success).toBe(false)
  })
})

describe('newsletterSchema', () => {
  it('validates email', () => {
    expect(newsletterSchema.safeParse({ email: 'test@test.com' }).success).toBe(true)
    expect(newsletterSchema.safeParse({ email: 'invalid' }).success).toBe(false)
  })
})
