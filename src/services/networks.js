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
const getNetworks = async () =>{
    return await resolver(axios.get(config.BACKEND_URL + '/networks', headers))
}
const getNetworkById = async (id) =>{
    return await resolver(axios.get(config.BACKEND_URL + `/networks/${id}`, headers))
}
const updateNetworkById = async (id, data) =>{
    return await resolver(axios.put(config.BACKEND_URL + `/networks/${id}`, data, headers))
}
const createNetwork = async (data) =>{
    return await resolver(axios.post(config.BACKEND_URL + '/networks', data, headers))
}

const getAllGroups = async (query = {}) =>{
    let rest = ''
    if(query.name) rest += `?name=${query.name}`
    if(query.link) rest += query.name? `&url=${query.url}` : `?url=${query.link}`
    return await resolver(axios.get(config.BACKEND_URL + '/networks/groups' + rest, headers))
}

const updateGroupById = async (id) =>{
    return await resolver(axios.put(config.BACKEND_URL + `network/groups/${id}`, headers))
}

const createGroup = async () =>{
    return await resolver(axios.get(config.BACKEND_URL + '/networks/groups', headers))
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