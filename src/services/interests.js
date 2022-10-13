import axios from 'axios'
import config from '../config'
import resolver from './resolver'
import { currentUser } from '../libs/userInfo'

const { token } = currentUser()

const headers = {
    headers: {
        "x-access-token": token
    }
}

const getInterests = async () => {
    return await resolver(axios.get(config.BACKEND_URL + '/interests', headers))
}
const getInterestsById = async (id) => {
    return await resolver(axios.get(config.BACKEND_URL + `/interests/${id}`, headers))
}
const updateInterestsById = async (id, data) => {
    return await resolver(axios.put(config.BACKEND_URL + `/interests/${id}`, data, headers))
}
const createInterest = async (data) => {
    return await resolver(axios.post(config.BACKEND_URL + '/interests', data, headers))
}
const deleteInterest = async (id) => {
    return await resolver(axios.delete(config.BACKEND_URL + `/interests/${id}`, headers))
}

//Interest objects
const getInterestsObjects = async () => {
    return await resolver(axios.get(config.BACKEND_URL + '/interests/objects', headers))
}
const getObjectsByInterest = async (interestId) => {
    return await resolver(axios.get(config.BACKEND_URL + `/interests/${interestId}/objects`, headers))
}
const createInterestObject = async (data) => {
    return await resolver(axios.post(config.BACKEND_URL + '/interests/objects', data, headers))
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