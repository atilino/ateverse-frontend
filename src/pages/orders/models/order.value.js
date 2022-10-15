//@ts-check
'use strict'

class Order {
  constructor({ network, variant, priority = false }) {
    this.network = network
    this.variant = variant
    this.priority = priority
  }
}

export default Order
