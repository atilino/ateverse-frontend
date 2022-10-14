//@ts-check
'use strict'

const { facebook } = require('../domain')
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
   * @returns {import('../domain/order.entity').IOrder} instanced Order object
   */
  createOrder(variant, order) {
    if(!facebook[variant]) throw new Error('Variante invalida')
    return new facebook[variant](order)
  }
}

module.exports = FacebookFactory
