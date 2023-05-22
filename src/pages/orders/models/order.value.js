//@ts-check
'use strict'

class Order {
  constructor({ network, variant, customer, tags, priority = false }) {
    this.network = network
    this.variant = variant
    this.priority = priority
    this.customer = customer || null
    this.tags = tags || []
  }
  validate() {
    throw new Error('Not implemented')
  }
}

export default Order
