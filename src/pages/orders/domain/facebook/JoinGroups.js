//@ts-check
'use strict'
const Order = require('../order.value')
const { constants } = require('../../../../utilities')


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
   * @param {string} orderData.userId
   * @param {string} orderData.network
   * @param {number} orderData.variant
   * @param {JoinGroupsOptions} orderData.options
   * @param {boolean} orderData.priority
   */

  constructor({ userId, network, variant, options, priority }) {
    super({ userId, network, variant, priority })
    this.executed = {
      groups: []
    }
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

module.exports = JoinGroups
