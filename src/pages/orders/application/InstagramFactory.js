//@ts-check
'use strict'

import { instagram } from '../models'
/** @typedef {import('./network-factory.interface').IFactory } IFactory */

/** Instagram order factory */
/** @implements {IFactory} */
class InstagramFactory {
  /**
   * Create a order
   * @param {number} variant Order variant
   * @param {object} order Order object
   * @returns {import('../models/order.entity').IOrder} instanced Order object
   */
  createOrder(variant, order) {
    if (!instagram[variant]) throw new Error('Variante invalida')
    return new instagram[variant](order)
  }
}

export default InstagramFactory
