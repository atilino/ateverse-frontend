//@ts-check
'use strict'
import Order from '../order.value'
import { constants } from '../../../../utilities'

/** @typedef {import('../order.entity').IOrder} IOrder*/

/**
 * @typedef {object} ShareGroupsOptions
 * @prop {string} link
 * @prop {string} profileId
 * @prop {Array<{ name: string, comment: string }>} groups
 */
/** @implements {IOrder} */
class ShareGroups extends Order {

  /**
   * @constructor
   * @param {object} orderData
   * @param {string} orderData.userId
   * @param {string} orderData.network
   * @param {number} orderData.variant
   * @param {ShareGroupsOptions} orderData.options
   * @param {boolean} orderData.priority
   */

  constructor({ userId, network, variant, options, priority }) {
    super({ userId, network, variant, priority })
    this.executed = {
      groups: []
    }
    /** @type {ShareGroupsOptions} */
    this.options = options
  }

  validate() {
    if (this.variant !== 2) return false
    if (typeof this.network !== 'string') return false
    if (typeof this.options.profileId !== 'string') return false
    if (this.options.groups.filter(g => typeof g.comment !== 'string' || typeof g.name !== 'string').length) return false
    if(typeof this.options.link !== 'string' || !constants.PATTERNS.FACEBOOK.GROUPS.test(this.options.link)) return false
    return true

  }
}

export default ShareGroups
