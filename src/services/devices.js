import axios from 'axios'
import config from '../config'
import resolver from './resolver'
import { currentUser } from '../libs/userInfo'

const headerConfig = {
    headers: {}
}

const getDevices = async () => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return await resolver(axios.get(config.BACKEND_URL + '/devices', headerConfig))
}
const getDeviceById = async (id) => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return await resolver(axios.get(config.BACKEND_URL + `/devices/${id}`, headerConfig))
}
const updateDeviceById = async (id, data) => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return await resolver(axios.put(config.BACKEND_URL + `/devices/${id}`, data, headerConfig))
}
const createDevice = async (data) => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return await resolver(axios.post(config.BACKEND_URL + '/devices', data, headerConfig))
}
const deleteDeviceById = async (id) => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return await resolver(axios.delete(config.BACKEND_URL + `/devices/${id}`, headerConfig))
}
const getDeviceAccountsById = async (id) => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return await resolver(axios.get(config.BACKEND_URL + `/accounts?deviceId=${id}`, headerConfig))
}

const getDeviceLogs = async (id, variableName, from, to) => {
    const { token } = currentUser()
    let url = `/devices/${id}/logs?name=${variableName}&from=${from}`

    if (to !== undefined) {
        url += `&to=${to}`
    }
    return await resolver(axios.get(config.BACKEND_URL + url, {
        headers: {
            'x-access-token': token
        }
    }))
}

const getDeviceProcesses = async (id) => {
    const { token } = currentUser()
    return await resolver(axios.get(config.BACKEND_URL + `/devices/${id}/processes`, {
        headers: {
            'x-access-token': token
        }
    }))
}
export default {
    getDevices,
    getDeviceById,
    updateDeviceById,
    createDevice,
    deleteDeviceById,
    getDeviceAccountsById,
    getDeviceLogs,
    getDeviceProcesses
}
