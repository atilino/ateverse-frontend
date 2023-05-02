import axios from 'axios'
import config from '../config'
import resolver from './resolver'
import { currentUser } from '../libs/userInfo'

const headerConfig = {
    headers: {}
}
const listCategories = async () => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return await resolver(axios.get(config.BACKEND_URL + '/tags/categories/list', headerConfig))
}

// const createCustomer = async (data) => {
//     const { token } = currentUser()
//     headerConfig.headers['x-access-token'] = token
//     return await resolver(axios.post(config.BACKEND_URL + '/customers', data, headerConfig))
// }

// const getCustomerById = async (id) => {
//     const { token } = currentUser()
//     headerConfig.headers['x-access-token'] = token
//     return await resolver(axios.get(config.BACKEND_URL + `/customers/${id}`, headerConfig))
// }

// const updateCustomerById = async (id, data) => {
//     const { token } = currentUser()
//     headerConfig.headers['x-access-token'] = token
//     return await resolver(axios.put(config.BACKEND_URL + `/customers/${id}`, data, headerConfig))
// }

// const deleteCustomerById = async (id) => {
//     const { token } = currentUser()
//     headerConfig.headers['x-access-token'] = token
//     return await resolver(axios.delete(config.BACKEND_URL + `/customers/${id}`, headerConfig))
// }

export default {
  listCategories,
}