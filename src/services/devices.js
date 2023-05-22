import axios from 'axios'
import config from '../config'
import resolver from './resolver'
import { currentUser } from '../libs/userInfo'
import { DEFAULT_PAGINATE_LIMIT } from '../constants/accounts'

const headerConfig = {
    headers: {}
}

const listDevices = async (page, limit, query) => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token

    let queryString = ''
    if(page) {
        queryString += `?page=${page}`
    }
    if(limit) {
        queryString += `&limit=${limit}`
    }
    if(typeof query?.status === 'string') {
        queryString += `&status=${query.status}`
    }
    if(typeof query?.imei === 'string') {
        queryString += `&imei=${query.imei}`
    }
    if(typeof query?.switch === 'boolean') {
        queryString += `&switch=${query.switch}`
    }
    if(typeof query?.connected === 'boolean') {
        queryString += `&connected=${query.connected}`
    }
    if(typeof query?.upgradeable === 'boolean') {
        queryString += `&upgradeable=${query.upgradeable}`
    }

    return await resolver(axios.get(config.BACKEND_URL + `/devices${queryString}`, headerConfig))
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

const listDeviceProcesses = async (id) => {
    const { token } = currentUser()
    return await resolver(axios.get(config.BACKEND_URL + `/devices/${id}/processes`, {
        headers: {
            'x-access-token': token
        }
    }))
}

const upgradeDevice = async (id) => {
    const { token } = currentUser()
    return await resolver(axios.post(config.BACKEND_URL + `/devices/${id}/upgrade`, {}, {
        headers: {
            'x-access-token': token
        }
    }))
}

const upgradeChromeDevice = async (id) => {
    const { token } = currentUser()
    return await resolver(axios.post(config.BACKEND_URL + `/devices/${id}/upgrade-chrome`, {}, {
        headers: {
            'x-access-token': token
        }
    }))
}

const rebootDevice = async (id) => {
    const { token } = currentUser()
    return await resolver(axios.post(config.BACKEND_URL + `/devices/${id}/reboot`, {}, {
        headers: {
            'x-access-token': token
        }
    }))
}

const executeDeviceCommand = async (id, command) => {
    const { token } = currentUser()
    return await resolver(axios.post(config.BACKEND_URL + `/devices/${id}/execute`, { command }, {
        headers: {
            'x-access-token': token
        }
    }))
}

export default {
    listDevices,
    getDeviceById,
    updateDeviceById,
    createDevice,
    deleteDeviceById,
    getDeviceAccountsById,
    getDeviceLogs,
    listDeviceProcesses,
    upgradeDevice,
    upgradeChromeDevice,
    rebootDevice,
    executeDeviceCommand
}
