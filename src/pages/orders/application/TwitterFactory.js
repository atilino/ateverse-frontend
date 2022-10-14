//@ts-check
'use strict'

const { twitter } = require('../domain')
/** @typedef {import('./network-factory.interface').IFactory} IFactory */


/** Twitter order factory */
/** @implements {IFactory} */
class TwitterFactory {
  /**
   * Create a order
   * @param {number} variant Order variant
   * @param {object} order Order object
   * @returns {import('../domain/order.entity').IOrder} instanced Order object
   */
  createOrder(variant, order) {
    if (!twitter[variant]) throw new Error('Variante invalida')
    return new twitter[variant](order)
  }
}

module.exports = TwitterFactory
