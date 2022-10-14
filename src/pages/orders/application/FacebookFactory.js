//@ts-check
'use strict'

import { facebook } from '../models'
/** @typedef {import('./network-factory.interface').IFactory} IFactory*/

/**
 * Facebook order factory
 * @implements {IFactory}
 */
class FacebookFactory {
  /**
   * Create a order
   * @param {number} variant Order variant
   * @param {object} order Order object
   * @returns {import('../models/order.entity').IOrder} instanced Order object
   */
  createOrder(variant, order) {
    if(!facebook[variant]) throw new Error('Variante invalida')
    return new facebook[variant](order)
  }
}

export default FacebookFactory
