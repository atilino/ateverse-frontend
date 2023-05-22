//@ts-check
'use strict'
import Order from '../order.value'
import { constants } from '../../../../utilities'

/** @typedef {import('../order.entity').IOrder} IOrder*/

/**
 * @typedef {object} ShareGroupsOptions
 * @prop {string} link
 * @prop {Array<{ groupId: string, comment: string }>} groups
 */
/** @implements {IOrder} */
class ShareGroups extends Order {

  /**
   * @constructor
   * @param {object} orderData
   * @param {string} orderData.network
   * @param {number} orderData.variant
   * @param {ShareGroupsOptions} orderData.options
   * @param {string} orderData.customer
   * @param {boolean} orderData.priority
   * @param {boolean} orderData.tags
   */

  constructor({network, variant, options, priority, customer, tags }) {
    super({ network, variant, priority, customer, tags })
    /** @type {ShareGroupsOptions} */
    this.options = options
  }

  validate() {
    if (this.variant !== 2) return false
    if (typeof this.network !== 'string') return false
    if (this.options.groups.filter(g => typeof g.comment !== 'string' || typeof g.groupId !== 'string').length) return false
    if(typeof this.options.link !== 'string' || !constants.PATTERNS.FACEBOOK.GROUPS.test(this.options.link)) return false
    return true

  }
}

export default ShareGroups
