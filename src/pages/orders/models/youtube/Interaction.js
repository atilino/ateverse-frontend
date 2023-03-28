
//@ts-check
'use strict'

import Order  from '../order.value'
import { constants }  from '../../../../utilities'

/** @typedef {import('../order.entity').IOrder} IOrder */

/**
 * @typedef {object} InteractionOptions
 * @prop {string} link
 * @prop {number} reactions
 * @prop {number} reactionType
 * @prop {Array<string>} comments
 * @prop {number} shares
 */

/** @implements {IOrder} */
 class Interaction extends Order {

  /**
   * @constructor
   * @param {object} orderData
   * @param {string} orderData.network
   * @param {number} orderData.variant
   * @param {InteractionOptions} orderData.options
   * @param {boolean} orderData.priority
   * @param {string} orderData.customer
   */

  constructor({ network, variant, options, priority, customer }) {
    super({ network, variant, priority, customer })
    /** @type {InteractionOptions} */
    this.options = options
  }

  validate() {
    if (this.variant !== 0) return false
    if (typeof this.network !== 'string') return false
    if (typeof this.options.link !== 'string') return false
    if (!constants.PATTERNS.YOUTUBE.MAIN.test(this.options.link)) return false
    if (typeof this.options.reactions !== 'number') return false
    if (typeof this.options.comments !== 'object') return false
    if (typeof this.options.shares !== 'number') return false
    return true

  }
}

export default Interaction
