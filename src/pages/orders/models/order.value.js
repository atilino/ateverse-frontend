//@ts-check
'use strict'

import { constants } from '../../../utilities'

class Order {
  constructor({ userId, network, variant, priority = false, status = constants.ORDER_STATUS[0], deliveryAt = null }) {
    this.userId = userId
    this.network = network
    this.variant = variant
    this.priority = priority
    this.status = status
    this.deliveryAt = deliveryAt
  }
}

export default Order
