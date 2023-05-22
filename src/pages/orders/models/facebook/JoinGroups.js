//@ts-check
'use strict'
import Order from '../order.value'
import { constants } from '../../../../utilities'


/** @typedef {import('../order.entity').IOrder} IOrder*/

/**
 * @typedef {object} JoinGroupsOptions
 * @prop {Array<{ name: string, link: string }>} groups
 * @prop {string} profileId
 */
/** @implements {IOrder} */
class JoinGroups extends Order {

  /**
   * @constructor
   * @param {object} orderData
   * @param {string} orderData.network
   * @param {number} orderData.variant
   * @param {JoinGroupsOptions} orderData.options
   * @param {string} orderData.customer
   * @param {boolean} orderData.priority
   * @param {boolean} orderData.tags
   */

  constructor({ network, variant, options, priority, customer, tags }) {
    super({ network, variant, priority, customer, tags })
    /** @type {JoinGroupsOptions} */
    this.options = options
  }

  validate() {
    if (this.variant !== 1) return false
    if (typeof this.network !== 'string') return false
    if (typeof this.options.profileId !== 'string') return false
    if (this.options.groups.filter(g =>
      typeof g.link !== 'string' || typeof g.name !== 'string' || !constants.PATTERNS.FACEBOOK.GROUPS.test(g.link)).length) return false
    return true
  }
}

export default JoinGroups
