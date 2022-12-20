//@ts-check
'use strict'
import { constants } from '../../../../utilities'
import Order from '../order.value'

/** @typedef {import('../order.entity').IOrder} IOrder*/

/**
 * @typedef {object} FollowOptions
 * @prop {string} link
 * @prop {number} followers
 */
/** @implements {IOrder} */
class Follow extends Order {
  /**
   * @constructor
   * @param {object} orderData
   * @param {string} orderData.network
   * @param {number} orderData.variant
   * @param {FollowOptions} orderData.options
   * @param {boolean} orderData.priority
   */


  constructor({ network, variant, options, priority }) {
    super({ network, variant, priority })
    this.executed = {
      followers: 0
    }
    /** @type {FollowOptions} */
    this.options = options
  }

  validate() {
    if (this.variant !== 4) return false
    if (typeof this.network !== 'string') return false
    if(typeof this.options.link !== 'string' || !constants.PATTERNS.FACEBOOK.MAIN.test(this.options.link)) return false
    return true
  }
}

export default Follow