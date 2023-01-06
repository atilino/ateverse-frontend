/** @typedef {import('../models/metrics.model').Metrics} Metrics */

import { useEffect, useState } from 'react'
import metricsService from '../services/metrics'
import { resultHandler } from './helpers'
import { date, word } from '../utilities'

const variants = [
  ['reactions', 'Raccciones'],
  ['comments', 'Comentarios'],
  ['shares', 'Compartidos'],
  ['joinGroups', 'Agregar grupos'],
  ['shareGroups', 'Compartir en grupos'],
  ['reports', 'Reportes'],
  ['followers', 'Paginas seguidas'],
  ['publications', 'Publicaciones']
]

const networks = [ 'facebook', 'twitter', 'instagram' ]


const useMetrics = () => {
  /** @type {[Metrics, function]} */
  const [metrics, setMetrics] = useState({
    totalOrders: 0,
    taskOrders: variants.map(([name, label]) => ({ name, label, qty: 0 })),
    networkOrders: [networks.map(n => ({ name: n, qty: 0, label: word.capitalize(n) }))],
    customerOrders: [ { name: 'Sin cliente', qty: 0 }]
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
      to = date.today()
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
   * @param {('detailed' | 'simplified')} options.type
   */
  const downloadMetrics = async ({ from, to, network, customer, type }) => {
    return metricsService.downloadMetrics({ from, to, network, customer, type })
  }

  return {
    metrics,
    getMetrics,
    downloadMetrics
  }
}

export default useMetrics