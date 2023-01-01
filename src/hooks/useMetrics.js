/** @typedef {import('../models/metrics.model').Metrics} Metrics */

import { useEffect, useState } from 'react'
import metricsService from '../services/metrics'
import { resultHandler } from './helpers'
import { date } from '../utilities'

const useMetrics = () => {
  /** @type {[Metrics, function]} */
  const [metrics, setMetrics] = useState({
    totalOrders: 0,
    taskOrders: [],
    networkOrders: [],
    customerOrders: []
  })

  useEffect(() => {
    getMetrics()
  }, [])


  /**
   * @param {object} options
   * @param {(Date | string | number)} [options.from]
   * @param {(Date | string | number)} [options.to]
   * @param {string} [options.network]
   * @param {string} [options.customer]
   */
  const getMetrics = ({ from, to, network, customer } = {}) => {
    if (!to) {
      to = Date.now()
    }
    if (!from) {
      from = date.offset(Date.now(), -date.DAY * 30)
    }

    return metricsService
      .getMetrics({ from, to, network, customer })
      .then(response => resultHandler(response, result => {
        setMetrics(prevState => ({
          ...prevState,
          ...result
        }))
      }))
  }

  /**
   * @param {object} options
   * @param {(Date | string | number)} options.from
   * @param {(Date | string | number)} options.to
   * @param {string} [options.network]
   * @param {string} [options.customer]
   * @param {string} options.type
   */
  const downloadMetrics = async ({ from, to, network, customer, type }) => {
    const response = await metricsService.getMetrics({ from, to, network, customer, type })
    let res
    resultHandler(response, result => res = result)
    return res
  }

  return {
    metrics,
    getMetrics,
    downloadMetrics
  }
}

export default useMetrics