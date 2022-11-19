import axios from 'axios'
import config from '../config'
import resolver from './resolver'
import { currentUser } from '../libs/userInfo'

const headerConfig = {
    headers: {}
}

const getInterests = async () => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return await resolver(axios.get(config.BACKEND_URL + '/interests', headerConfig))
}
const getInterestsById = async (id) => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return await resolver(axios.get(config.BACKEND_URL + `/interests/${id}`, headerConfig))
}
const updateInterestsById = async (id, data) => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return await resolver(axios.put(config.BACKEND_URL + `/interests/${id}`, data, headerConfig))
}
const createInterest = async (data) => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return await resolver(axios.post(config.BACKEND_URL + '/interests', data, headerConfig))
}
const deleteInterest = async (id) => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return await resolver(axios.delete(config.BACKEND_URL + `/interests/${id}`, headerConfig))
}

//Interest objects
const getInterestsObjects = async () => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return await resolver(axios.get(config.BACKEND_URL + '/interests/objects', headerConfig))
}
const getObjectsByInterest = async (interestId) => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return await resolver(axios.get(config.BACKEND_URL + `/interests/${interestId}/objects`, headerConfig))
}
const createInterestObject = async (data) => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return await resolver(axios.post(config.BACKEND_URL + '/interests/objects', data, headerConfig))
}

export default {
    getInterests,
    getInterestsById,
    updateInterestsById,
    createInterest,
    deleteInterest,
    getInterestsObjects,
    getObjectsByInterest,
    createInterestObject,
}
