import axios from 'axios'
import config from '../config'
import resolver from './resolver'
import { currentUser } from '../libs/userInfo'

const headerConfig = {
    headers: {}
}

const listOrders = async (query) =>{
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token

    let queryString = ''
    if(query !== undefined) {
        queryString += '?'
    }
    if(query?.direct === true) {
        queryString += 'direct=true'
    }
    if(typeof query?.link === 'string') {
        queryString += `link=${query.link}`
    }
    return await resolver(axios.get(config.BACKEND_URL + '/orders' + queryString, headerConfig))
}

const patchDirectOrder = async (id, data) => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return await resolver(axios.patch(config.BACKEND_URL + `/orders/${id}/direct`, data, headerConfig))
}

const completeOrder = async (id) => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return await resolver(axios.patch(config.BACKEND_URL + `/orders/${id}/complete`, headerConfig))
}

const getOrderById = async (id) =>{
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return await resolver(axios.get(config.BACKEND_URL + `/orders/${id}`, headerConfig))
}

const createOrder= async (data) =>{
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return await resolver(axios.post(config.BACKEND_URL + '/orders', data, headerConfig))
}

export default {
    listOrders,
    getOrderById,
    createOrder,
    patchDirectOrder,
    completeOrder
}
