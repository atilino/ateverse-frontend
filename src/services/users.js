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
const getUsers = async () =>{
    return await resolver(axios.get(config.BACKEND_URL + '/users', headers))
}
const getUserById = async (id) =>{
    return await resolver(axios.get(config.BACKEND_URL + `/users/${id}`, headers))
}
const updateUserById = async (id, data) =>{
    return await resolver(axios.put(config.BACKEND_URL + `/users/${id}`, data, headers))
}
const deleteUserById = async (id) =>{
    return await resolver(axios.delete(config.BACKEND_URL + `/users/${id}`, headers))
}

export default {
    getUsers,
    getUserById,
    updateUserById,
    deleteUserById
}