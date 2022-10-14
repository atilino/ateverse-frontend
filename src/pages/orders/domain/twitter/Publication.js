
//@ts-check
'use strict'

const Order = require('../order.value')

/** @typedef {import('../order.entity').IOrder} IOrder */

/**
 * @typedef {object} PublicationOptions
 * @prop {Array<string>} publications
 */

/** @implements {IOrder} */
 class Publication extends Order {

  /**
   * @constructor
   * @param {object} orderData
   * @param {string} orderData.userId
   * @param {string} orderData.network
   * @param {number} orderData.variant
   * @param {PublicationOptions} orderData.options
   * @param {boolean} orderData.priority
   */

  constructor({ userId, network, variant, options, priority }) {
    super({ userId, network, variant, priority })
    this.executed = {
      publications: []
    }
    /** @type {PublicationOptions} */
    this.options = options
  }

  validate() {
    if (this.variant !== 1) return false
    if (typeof this.network !== 'string') return false
    if (typeof this.options.publications !== 'object') return false
    if (!this.options.publications.length) return false

    return true
  }
}

module.exports = Publication
