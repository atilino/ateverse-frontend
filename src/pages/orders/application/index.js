//@ts-check
'use strict'
/** @typedef {import('./order-factory.interface').IOrderFactory} IOrderFactory */

import facebook  from './FacebookFactory'
import twitter  from './TwitterFactory'
import instagram  from './InstagramFactory'


const networks = {
  facebook,
  twitter,
  instagram
}

/** Order factory for all networks */
/** @implements {IOrderFactory}*/
class OrderFactory {
  /**
   * Create a order
   * @param {string} networkName Network name
   * @param {object} order Order object
   * @returns {import('../models/order.entity').IOrder} instanced Order object
   */
  createNetworkOrder(networkName, order) {
    if(!networks[networkName]) throw new Error('Red social invalida')
    return new networks[networkName]().createOrder(order.variant, order)
  }
}

export default OrderFactory
