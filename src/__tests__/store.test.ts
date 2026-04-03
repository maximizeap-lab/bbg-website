import { describe, it, expect, beforeEach } from 'vitest'
import { useCartStore } from '@/lib/store'

describe('Cart Store', () => {
  beforeEach(() => {
    useCartStore.getState().clearCart()
  })

  it('adds item to cart', () => {
    const store = useCartStore.getState()
    store.addItem({ id: '1', name: 'BBG Hat', price_cents: 2500, image_url: '/test.jpg' })
    expect(useCartStore.getState().items).toHaveLength(1)
    expect(useCartStore.getState().totalItems()).toBe(1)
    expect(useCartStore.getState().totalCents()).toBe(2500)
  })

  it('increments quantity for duplicate item', () => {
    const store = useCartStore.getState()
    const item = { id: '1', name: 'BBG Hat', price_cents: 2500, image_url: '/test.jpg' }
    store.addItem(item)
    store.addItem(item)
    expect(useCartStore.getState().items).toHaveLength(1)
    expect(useCartStore.getState().items[0].quantity).toBe(2)
    expect(useCartStore.getState().totalCents()).toBe(5000)
  })

  it('removes item from cart', () => {
    const store = useCartStore.getState()
    store.addItem({ id: '1', name: 'Hat', price_cents: 2500, image_url: '/t.jpg' })
    store.removeItem('1')
    expect(useCartStore.getState().items).toHaveLength(0)
  })

  it('updates quantity', () => {
    const store = useCartStore.getState()
    store.addItem({ id: '1', name: 'Hat', price_cents: 2500, image_url: '/t.jpg' })
    store.updateQuantity('1', 5)
    expect(useCartStore.getState().items[0].quantity).toBe(5)
    expect(useCartStore.getState().totalCents()).toBe(12500)
  })

  it('clears cart', () => {
    const store = useCartStore.getState()
    store.addItem({ id: '1', name: 'Hat', price_cents: 2500, image_url: '/t.jpg' })
    store.addItem({ id: '2', name: 'Tee', price_cents: 3500, image_url: '/t.jpg' })
    store.clearCart()
    expect(useCartStore.getState().items).toHaveLength(0)
    expect(useCartStore.getState().totalItems()).toBe(0)
  })
})
