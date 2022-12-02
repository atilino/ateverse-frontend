import axios from 'axios'
import config from '../config'

const getEvidence = (orderId, accountId) => {
  return axios.get(`${config.BACKEND_URL}/storage/evidences/${orderId}/${accountId}`)
}

export default {
  getEvidence,
}