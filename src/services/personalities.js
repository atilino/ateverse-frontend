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

const getPersonalities = async () => {
    return await resolver(axios.get(config.BACKEND_URL + '/personalities', headers))
}
const getPersonalityById = async (id) => {
    return await resolver(axios.get(config.BACKEND_URL + `/personalities/${id}?raw=true`, headers))
}
const updatePersonalityById = async (id, data) => {
    return await resolver(axios.put(config.BACKEND_URL + `/personalities/${id}`, data, headers))
}
const createPersonality = async (data) => {
    return await resolver(axios.post(config.BACKEND_URL + '/personalities', data, headers))
}
// const deletePersonality = async (id) =>{
//     return await resolver(axios.delete(config.BACKEND_URL + `/personalities/${id}`, headers))
// }

//Personality Templates
const getTemplates = async () => {
    return await resolver(axios.get(config.BACKEND_URL + '/personalities/templates', headers))
}
const getTemplateById = async (id) => {
    return await resolver(axios.get(config.BACKEND_URL + `/personalities/templates/${id}`, headers))
}
const updateTemplateById = async (id, data) => {
    return await resolver(axios.put(config.BACKEND_URL + `/personalities/templates/${id}`, data, headers))
}
const createTemplate = async (data) => {
    return await resolver(axios.post(config.BACKEND_URL + '/personalities/templates', data, headers))
}
const deleteTemplateById = async (id) => {
    return await resolver(axios.delete(config.BACKEND_URL + `/personalities/templates/${id}`, headers))
}

export default {
    getPersonalities,
    getPersonalityById,
    updatePersonalityById,
    createPersonality,
    getTemplates,
    getTemplateById,
    updateTemplateById,
    createTemplate,
    deleteTemplateById
}