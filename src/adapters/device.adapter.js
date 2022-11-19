//@ts-check
'use strict'

/**
 * @typedef {import('../models/device.model').Device} IDevice
 */

const { DEVICE_STATUS } = require('constants/devices')

/**
 * @implements {IDevice}
 */
class Device {
  /**
   * @param {object} device
   */
  constructor(device) {
    this.id = device?._id || ''
    this.imei = device?.imei || ''
    this.status = device?.status || DEVICE_STATUS.OFF
    this.switch = device?.switch || false
    this.agentsLimit = device?.agentsLimit || 0
    this.password = device?.password || ''
    this.region = device?.region || 'A'
    this.connected = device?.connected || false
    this.upgradeable = device?.upgradeable || false
    this.version = device?.version || ''
    this.accounts = device?.accounts
  }
}

export default Device