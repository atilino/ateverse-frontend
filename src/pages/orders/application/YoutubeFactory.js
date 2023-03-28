//@ts-check
'use strict'

import { youtube } from '../models'
/** @typedef {import('./network-factory.interface').IFactory} IFactory*/

/**
 * Youtube order factory
 * @implements {IFactory}
 */
class YoutubeFactory {
  /**
   * Create a order
   * @param {number} variant Order variant
   * @param {object} order Order object
   * @returns {import('../models/order.entity').IOrder} instanced Order object
   */
  createOrder(variant, order) {
    if(!youtube[variant]) throw new Error('Variante invalida')
    return new youtube[variant](order)
  }
}

export default YoutubeFactory
