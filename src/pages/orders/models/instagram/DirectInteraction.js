
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
   * @param {string} orderData.customer
   * @param {boolean} orderData.priority
   * @param {boolean} orderData.private
   * @param {Array<string>} orderData.tags
   */

  constructor({ network, variant, options, priority, customer, tags }) {
    super({ network, variant, priority, customer, tags })
    this.executed = {
      reactions: 0,
      comments: [],
    }
    /** @type {DirectInteractionOptions} */
    this.options = options
  }

  validate() {
    if (this.variant !== 3) return false
    if (typeof this.network !== 'string') return false
    if (typeof this.options.link !== 'string') return false
    if (!constants.PATTERNS.INSTAGRAM.MAIN.test(this.options.link)) return false
    if (typeof this.options.reactions !== 'number') return false
    if (typeof this.options.comments !== 'object') return false
    if (typeof this.options.shares !== 'number') return false

    return true
  }
}

export default Interaction