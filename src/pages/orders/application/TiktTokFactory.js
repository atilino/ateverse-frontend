//@ts-check
'use strict'

import { tiktok } from '../models'
/** @typedef {import('./network-factory.interface').IFactory} IFactory*/

/**
 * TikTok order factory
 * @implements {IFactory}
 */
class TikTokFactory {
  /**
   * Create a order
   * @param {number} variant Order variant
   * @param {object} order Order object
   * @returns {import('../models/order.entity').IOrder} instanced Order object
   */
  createOrder(variant, order) {
    if(!tiktok[variant]) throw new Error('Variante invalida')
    return new tiktok[variant](order)
  }
}

export default TikTokFactory
