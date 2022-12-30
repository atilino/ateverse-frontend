
//@ts-check
'use strict'
import Order from '../order.value'
import { constants } from '../../../../utilities'

/** @typedef {import('../order.entity').IOrder} IOrder*/

/**
 * @typedef {object} ReportOptions
 * @prop {string} link
 * @prop {string} type
 * @prop {string} reason
 * @prop {number} reports
 */
/** @implements {IOrder} */
class Report extends Order {
  /**
   * @constructor
   * @param {object} orderData
   * @param {string} orderData.userId
   * @param {string} orderData.network
   * @param {number} orderData.variant
   * @param {ReportOptions} orderData.options
   * @param {string} orderData.customer
   * @param {boolean} orderData.priority
   */


  constructor({ network, variant, options, priority, customer }) {
    super({ network, variant, priority, customer })
    /** @type {ReportOptions} */
    this.options = options
  }

  validate() {
    if (this.variant !== 3) return false
    if (typeof this.network !== 'string') return false
    if(typeof this.options.link !== 'string' || !constants.PATTERNS.FACEBOOK.MAIN.test(this.options.link)) return false
    return true
  }
}

export default Report
