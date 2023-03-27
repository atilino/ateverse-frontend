//@ts-check
'use strict'
/** @typedef {import('./order-factory.interface').IOrderFactory} IOrderFactory */

import facebook  from './FacebookFactory'
import twitter  from './TwitterFactory'
import instagram  from './InstagramFactory'
import tiktok from './TiktTokFactory'
import youtube  from './YoutubeFactory'

const networks = {
  facebook,
  twitter,
  instagram,
  tiktok,
  youtube
}

/** Order factory for all networks */
/** @implements {IOrderFactory}*/
export class OrderFactory {
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

