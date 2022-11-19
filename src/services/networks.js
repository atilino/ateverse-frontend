import axios from 'axios'
import config from '../config'
import resolver from './resolver'
import { currentUser } from '../libs/userInfo'

const headerConfig = {
    headers: {}
}

const getNetworks = async () => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return await resolver(axios.get(config.BACKEND_URL + '/networks', headerConfig))
}
const getNetworkById = async (id) => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return await resolver(axios.get(headerConfig.BACKEND_URL + `/networks/${id}`, headerConfig))
}
const updateNetworkById = async (id, data) => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return await resolver(axios.put(config.BACKEND_URL + `/networks/${id}`, data, headerConfig))
}
const createNetwork = async (data) => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return await resolver(axios.post(config.BACKEND_URL + '/networks', data, headerConfig))
}

const getAllGroups = async (query = {}) => {
    let rest = ''
    if (query.name) rest += `?name=${query.name}`
    if (query.link) rest += query.name ? `&url=${query.url}` : `?url=${query.link}`

    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return await resolver(axios.get(config.BACKEND_URL + '/networks/groups' + rest, headerConfig))
}

const updateGroupById = async (id) => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return await resolver(axios.put(config.BACKEND_URL + `network/groups/${id}`, headerConfig))
}

const createGroup = async () => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return await resolver(axios.get(config.BACKEND_URL + '/networks/groups', headerConfig))
}

export default {
    getNetworks,
    getNetworkById,
    updateNetworkById,
    createNetwork,
    getAllGroups,
    updateGroupById,
    createGroup,
}
