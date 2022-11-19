import axios from 'axios'
import config from '../config'
import resolver from './resolver'
import { currentUser } from '../libs/userInfo'

const headerConfig = {
    headers: {}
}
const getUsers = async () => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return await resolver(axios.get(config.BACKEND_URL + '/users', headerConfig))
}
const getUserById = async (id) => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return await resolver(axios.get(config.BACKEND_URL + `/users/${id}`, headerConfig))
}
const updateUserById = async (id, data) => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return await resolver(axios.put(config.BACKEND_URL + `/users/${id}`, data, headerConfig))
}
const deleteUserById = async (id) => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return await resolver(axios.delete(config.BACKEND_URL + `/users/${id}`, headerConfig))
}

export default {
    getUsers,
    getUserById,
    updateUserById,
    deleteUserById
}
