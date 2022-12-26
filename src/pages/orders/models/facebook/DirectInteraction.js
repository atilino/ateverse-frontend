
//@ts-check
'use strict'
import { constants } from '../../../../utilities'
import Order from '../order.value'

/** @typedef {import('../order.entity').IOrder} IOrder*/

/**
 * @typedef {object} DirectInteractionOptions
 * @prop {string} link
 * @prop {number} reactions
 * @prop {number} reactionType
 * @prop {Array<string>} comments
 * @prop {number} shares
 * @prop {boolean} direct
 * @prop {number} watchTime
 */
/** @implements {IOrder} */
class Interaction extends Order {

  /**
   * @constructor
   * @param {object} orderData
   * @param {string} orderData.network
   * @param {number} orderData.variant
   * @param {DirectInteractionOptions} orderData.options
   * @param {boolean} orderData.priority
   */

  constructor({ network, variant, options, priority }) {
    super({ network, variant, priority })
    this.executed = {
      reactions: 0,
      comments: [],
      shares: 0
    }
    /** @type {DirectInteractionOptions} */
    this.options = options
  }

  validate() {
    if (this.variant !== 5) return false
    if (typeof this.network !== 'string') return false
    if (typeof this.options.link !== 'string') return false
    if (!constants.PATTERNS.FACEBOOK.MAIN.test(this.options.link)) return false
    if (typeof this.options.reactions !== 'number') return false
    if (typeof this.options.comments !== 'object') return false
    if (typeof this.options.shares !== 'number') return false

    return true
  }
}

export default Interaction
