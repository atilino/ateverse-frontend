import axios from 'axios'
import config from '../config'
import resolver from './resolver'
import { currentUser } from '../libs/userInfo'

const headerConfig = {
    headers: {}
}

const getPersonalities = async () => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return await resolver(axios.get(config.BACKEND_URL + '/personalities', headerConfig))
}
const getPersonalityById = async (id) => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return await resolver(axios.get(config.BACKEND_URL + `/personalities/${id}?raw=true`, headerConfig))
}
const updatePersonalityById = async (id, data) => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return await resolver(axios.put(config.BACKEND_URL + `/personalities/${id}`, data, headerConfig))
}
const createPersonality = async (data) => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return await resolver(axios.post(config.BACKEND_URL + '/personalities', data, headerConfig))
}

//Personality Templates
const getTemplates = async () => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return await resolver(axios.get(config.BACKEND_URL + '/personalities/templates', headerConfig))
}
const getTemplateById = async (id) => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return await resolver(axios.get(config.BACKEND_URL + `/personalities/templates/${id}`, headerConfig))
}
const updateTemplateById = async (id, data) => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return await resolver(axios.put(config.BACKEND_URL + `/personalities/templates/${id}`, data, headerConfig))
}
const createTemplate = async (data) => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return await resolver(axios.post(config.BACKEND_URL + '/personalities/templates', data, headerConfig))
}
const deleteTemplateById = async (id) => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return await resolver(axios.delete(config.BACKEND_URL + `/personalities/templates/${id}`, headerConfig))
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
