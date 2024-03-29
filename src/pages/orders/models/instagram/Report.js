
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
   * @param {string} orderData.network
   * @param {number} orderData.variant
   * @param {ReportOptions} orderData.options
   * @param {string | null} orderData.customer
   * @param {boolean} orderData.priority
   * @param {boolean} orderData.tags
   */


  constructor({ network, variant, options, priority, customer, tags }) {
    super({ network, variant, priority, customer, tags })
    /** @type {ReportOptions} */
    this.options = options
  }

  validate() {
    if (this.variant !== 2) return false
    if (typeof this.network !== 'string') return false
    if(typeof this.options.link !== 'string' || !constants.PATTERNS.INSTAGRAM.MAIN.test(this.options.link)) return false
    return true
  }
}

export default Report
