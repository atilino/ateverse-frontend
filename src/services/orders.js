import axios from 'axios'
import config from '../config'
import resolver from './resolver'
import { currentUser } from '../libs/userInfo'

const { token } = currentUser()

const headers = {
    headers:{
        "x-access-token": token
    }
}
const getOrders = async () =>{
    return await resolver(axios.get(config.BACKEND_URL + '/orders', headers))
}
const getOrderById = async (id) =>{
    return await resolver(axios.get(config.BACKEND_URL + `/orders/${id}`, headers))
}

const createOrder= async (data) =>{
    return await resolver(axios.post(config.BACKEND_URL + '/orders', data, headers))
}

export default {
    getOrders,
    getOrderById,
    createOrder
}