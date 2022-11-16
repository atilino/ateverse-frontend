import axios from 'axios'
import config from '../config'
import resolver from './resolver'
import { currentUser } from '../libs/userInfo'

const headerConfig = {
    headers: {}
}

const getOrders = async () =>{
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return await resolver(axios.get(config.BACKEND_URL + '/orders', headerConfig))
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
    getOrders,
    getOrderById,
    createOrder
}
