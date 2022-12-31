//@ts-check
'use strict'

class Order {
  constructor({ network, variant, customer, priority = false }) {
    this.network = network
    this.variant = variant
    this.priority = priority
    this.customer = customer || null
  }
}

export default Order
