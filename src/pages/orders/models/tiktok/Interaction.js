//@ts-check
'use strict'
import Order from '../order.value'
import { constants } from '../../../../utilities'


/** @typedef {import('../order.entity').IOrder} IOrder*/

/**
 * @typedef {object} InteractionOptions
 * @prop {string} link
 * @prop {number} reactions
 * @prop {number} reactionType
 * @prop {Array<string>} comments
 * @prop {number} shares
 * @prop {number} watchTime
 */
/** @implements {IOrder} */
class Interaction extends Order {

  /**
   * @constructor
   * @param {object} orderData
   * @param {string} orderData.network
   * @param {number} orderData.variant
   * @param {InteractionOptions} orderData.options
   * @param {string | null} orderData.customer
   * @param {boolean} orderData.priority
   */

  constructor({network, variant, options, priority, customer }) {
    super({ network, variant, priority, customer })
    this.executed = {
      reactions: 0,
      comments: [],
      shares: 0
    }
    /** @type {InteractionOptions} */
    this.options = options
  }

  validate() {
    if (this.variant !== 0) return false
    if (typeof this.network !== 'string') return false
    if (typeof this.options.link !== 'string') return false
    if (!constants.PATTERNS.TIKTOK.MAIN.test(this.options.link)) return false
    if (typeof this.options.reactions !== 'number') return false
    if (typeof this.options.comments !== 'object') return false
    if (typeof this.options.shares !== 'number') return false

    return true
  }
}

export default Interaction
