import axios from 'axios'
import config from '../config'
import resolver from './resolver'
import { currentUser } from '../libs/userInfo'
import { DEFAULT_PAGINATE_LIMIT } from '../constants/orders'

const headerConfig = {
    headers: {}
}

const listOrders = async (page, limit, query) => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token

    page = page || 1
    limit = limit || DEFAULT_PAGINATE_LIMIT

    let queryString = ''
    if (query?.direct === true) {
        queryString += 'direct=true'
    }
    if (typeof query?.link === 'string') {
        if (queryString !== '?') queryString += '&'
        queryString += `link=${query.link}`
    }
    if (typeof query?.customer === 'string') {
        if (queryString !== '?') queryString += '&'
        queryString += `customer=${query.customer}`
    }
    if (typeof query?.network === 'string') {
        if (queryString !== '?') queryString += '&'
        queryString += `network=${query.network}`
    }
    if (typeof query?.variant === 'number') {
        if (queryString !== '?') queryString += '&'
        queryString += `variant=${query.variant}`
    }
    return await resolver(axios.get(config.BACKEND_URL + `/orders?page=${page}&limit=${limit}${queryString}`, headerConfig))
}

const getDirectOrder = async () => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return await resolver(axios.get(config.BACKEND_URL + `/orders?direct=true`, headerConfig))
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

const getOrderById = async (id) => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return await resolver(axios.get(config.BACKEND_URL + `/orders/${id}`, headerConfig))
}

const createOrder = async (data) => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return await resolver(axios.post(config.BACKEND_URL + '/orders', data, headerConfig))
}

const updateOrder = async (id, data) => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return await resolver(axios.patch(config.BACKEND_URL + `/orders/${id}`, data, headerConfig))
}

export default {
    listOrders,
    getOrderById,
    createOrder,
    patchDirectOrder,
    completeOrder,
    getDirectOrder,
    updateOrder
}
