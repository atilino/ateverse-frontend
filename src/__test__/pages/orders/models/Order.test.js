import Order from '../../../../pages/orders/models/Order'
const newOrder = {
  userId: 'test-user',
  network: 'facebook',
  variant: 0,
  options: {
    watchTime: 0
  }
}

describe('entity', () => {
    describe('#validate', () => {
      test('Not provide variant', () => {
          const order = new Order({ userId: newOrder.userId, network: newOrder.network })
          expect(order.validate()).toBe(false)
      })
      test('Not provide network', () => {
          const order = new Order({ userId: newOrder.userId, variant: newOrder.variant })
          expect(order.validate()).toBe(false)
      })
      test('Not provide userId valid', () => {
          const order = new Order({ variant: newOrder.variant, network: newOrder.network })
          expect(order.validate()).toBe(false)
      })
      describe('- variant 0', () => {
        test('Not provide valid options', () => {
          const orderNonOptions = new Order({ ...newOrder, options: {} })
          expect(orderNonOptions.validate()).toBe(false)

          const order = new Order({ ...newOrder, options: { watchTime: '1'} })
          expect(order.validate()).toBe(false)
        })
        test('With valid options', () => {
          const order = new Order({ ...newOrder, options: { watchTime: 1} })
          expect(order.validate()).toBe(true)
        })
      })
      describe('- variant 4', () => {
        test('Not provide valid options', () => {
          const orderNonOptions = new Order({ ...newOrder, variant: 4, options: {} })
          expect(orderNonOptions.validate()).toBe(false)

          const order = new Order({ ...newOrder, variant: 4, options: {
            type: 1,
            reportsNumber: '3',
            reason: null
          } })
          expect(order.validate()).toBe(false)
        })
        test('With valid options', () => {
          const order = new Order({ ...newOrder, variant: 4, options: {
            type: 'group',
            reportsNumber: 4,
            reason: 'social'
          } })
          expect(order.validate()).toBe(true)
        })
      })
    })
})