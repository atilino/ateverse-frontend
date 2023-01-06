import axios from 'axios'
import config from '../config'
import resolver from './resolver'
import { currentUser } from '../libs/userInfo'

const headerConfig = {
  headers: {}
}

const getMetrics = async (query) => {
  const { token } = currentUser()
  headerConfig.headers['x-access-token'] = token
  return await resolver(axios.get(config.BACKEND_URL + '/metrics' + queryBuilder(query), headerConfig))
}

const downloadMetrics = async (query) => {
  const { token } = currentUser()
  return await axios.get(config.BACKEND_URL + '/metrics/download' + queryBuilder(query), {
    headers: {
      'x-access-token': token
    },
    responseType: 'blob'
  })
}

const queryBuilder = ({ from, to, network, customer, type }) => {
  let query = ''

  if (from || to || network || customer) {
    query += '?'
  }
  if (from) {
    query += 'from=' + new Date(from).toISOString()
  }
  if (to) {
    if (from) query += '&'
    query += 'to=' + new Date(to).toISOString()
  }
  if (network) {
    if (from || to) query += '&'
    query += 'network=' + network
  }
  if (customer) {
    if (from || to || network) query += '&'
    query += 'customer=' + customer
  }
  if (type) {
    if (from || to || network || customer) query += '&'
    query += 'type=' + type
  }
  return query
}

export default {
  getMetrics,
  downloadMetrics
}