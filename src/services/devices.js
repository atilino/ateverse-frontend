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
const getDevices = async () =>{
    return await resolver(axios.get(config.BACKEND_URL + '/devices', headers))
}
const getDeviceById = async (id) =>{
    return await resolver(axios.get(config.BACKEND_URL + `/devices/${id}`, headers))
}
const updateDeviceById = async (id, data) =>{
    return await resolver(axios.put(config.BACKEND_URL + `/devices/${id}`, data, headers))
}
const createDevice= async (data) =>{
    return await resolver(axios.post(config.BACKEND_URL + '/devices', data, headers))
}
const deleteDeviceById = async (id) =>{
    return await resolver(axios.delete(config.BACKEND_URL + `/devices/${id}`, headers))
}
const getDeviceAccountsById = async (id) => {
    return await resolver(axios.get(config.BACKEND_URL + `/accounts?deviceId=${id}`, headers))
}

const getDeviceLogs = async (id) => {
    return await resolver(axios.get(config.BACKEND_URL + `/devices/${id}/logs`, headers))
}

export default {
    getDevices,
    getDeviceById,
    updateDeviceById,
    createDevice,
    deleteDeviceById,
    getDeviceAccountsById,
    getDeviceLogs
}