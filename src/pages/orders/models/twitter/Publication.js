
//@ts-check
'use strict'

import Order from '../order.value'

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
   * @param {string} orderData.network
   * @param {number} orderData.variant
   * @param {PublicationOptions} orderData.options
   * @param {boolean} orderData.priority
   * @param {string} orderData.customer
   */

  constructor({ network, variant, options, priority, customer }) {
    super({ network, variant, priority, customer })
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

export default Publication
