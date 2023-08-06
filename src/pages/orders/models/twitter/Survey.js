//@ts-check
'use strict'
import { constants } from '../../../../utilities'
import Order from '../order.value'

/** @typedef {import('../order.entity').IOrder} IOrder*/

/**
 * @typedef {object} SurveyOptions
 * @prop {string} link
 * @prop {number} votes
 * @prop {number} option
 */
/** @implements {IOrder} */
class Survey extends Order {
  /**
   * @constructor
   * @param {object} orderData
   * @param {string} orderData.network
   * @param {number} orderData.variant
   * @param {SurveyOptions} orderData.options
   * @param {string} orderData.customer
   * @param {boolean} orderData.priority
   * @param {boolean} orderData.tags
   */


  constructor({ network, variant, options, priority, customer, tags }) {
    super({ network, variant, priority, customer, tags })
    this.executed = {
      votes: 0
    }
    /** @type {SurveyOptions} */
    this.options = options
  }

  validate() {
    if (this.variant !== 3) return false
    if (typeof this.network !== 'string') return false
    if(typeof this.options.link !== 'string' || !constants.PATTERNS.TWITTER.MAIN.test(this.options.link)) return false
    return true
  }
}

export default Survey