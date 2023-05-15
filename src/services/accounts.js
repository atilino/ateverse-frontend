
import axios from 'axios'
import config from '../config'
import resolver from './resolver'
import { currentUser } from '../libs/userInfo'
import { DEFAULT_PAGINATE_LIMIT } from 'constants/accounts'

const headerConfig = {
    headers: {}
}

const getAccounts = async (page, limit, query) => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    page = page || 1
    limit = limit || DEFAULT_PAGINATE_LIMIT

    let queryString = ''
    if (query?.name) queryString += `&name=${query.name}`
    if (query?.phone) queryString += `&phone=${query.phone}`
    if (query?.imei) queryString += `&imei=${query.imei}`

    return (await resolver(axios.get(config.BACKEND_URL + `/accounts?page=${page}&limit=${limit}${queryString}`, headerConfig)))
}

const listAccountsSummary = async() => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return (await resolver(axios.get(config.BACKEND_URL + `/accounts/summary`, headerConfig)))
}

const getAccountsByImei = async (imei) => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return (await resolver(axios.get(config.BACKEND_URL + `/accounts?imei=${imei}`, headerConfig)))
}
const getAccountById = async (id) => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return (await resolver(axios.get(config.BACKEND_URL + `/accounts/${id}`, headerConfig)))
}
const updateAccountById = async (id, data) => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return (await resolver(axios.put(config.BACKEND_URL + `/accounts/${id}`, data, headerConfig)))
}

const updateAccountStatus = async (id, status) => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return (await resolver(axios.patch(config.BACKEND_URL + `/accounts/${id}/status`, { status }, headerConfig)))
}

const createAccount = async (data) => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return (await resolver(axios.post(config.BACKEND_URL + '/accounts', data, headerConfig)))
}
const deleteAccountById = async (id) => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return (await resolver(axios.delete(config.BACKEND_URL + `/accounts/${id}`, headerConfig)))
}

//Account profiles
const getProfiles = async (network) => {
    const endpoint = network ? `/accounts/profiles?networkId=${network}` : '/accounts/profiles'
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return (await resolver(axios.get(config.BACKEND_URL + endpoint, headerConfig)))
}

const getProfilesByAccountId = async (accountId) => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return (await resolver(axios.get(config.BACKEND_URL + `/accounts/${accountId}/profiles`, headerConfig)))
}
const getBlockedProfiles = async (networkId) => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return (await resolver(axios.get(config.BACKEND_URL + `/accounts/profiles/blocked?networkId=${networkId}`, headerConfig)))
}
const updateProfileById = async (id, data) => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return (await resolver(axios.put(config.BACKEND_URL + `/accounts/profiles/${id}`, data, headerConfig)))
}
const updateProfileStatus = async (id, status) => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return (await resolver(axios.patch(config.BACKEND_URL + `/accounts/profiles/${id}/status`, { status }, headerConfig)))
}
const createProfile = async (data) => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return (await resolver(axios.post(config.BACKEND_URL + '/accounts/profiles', data, headerConfig)))
}
const deleteProfileById = async (id) => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return (await resolver(axios.delete(config.BACKEND_URL + `/accounts/profiles/${id}`, headerConfig)))
}
const getActiveProfiles = async (network) => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return (await resolver(axios.get(config.BACKEND_URL + `/accounts/profiles/${network}/active`, headerConfig)))
}
/**
 * 
 * @param {string} network
 * @param {string} [templateId]
 */
const getAvailableProfiles = async (network, templateId) => {
    const { token } = currentUser()
    let url = config.BACKEND_URL + `/accounts/${network}/available`
    if(templateId) url += `?templateId=${templateId}`
    headerConfig.headers['x-access-token'] = token
    return (await resolver(axios.get(url, headerConfig)))
}
const listProfilesGroups = async (id) => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return (await resolver(axios.get(config.BACKEND_URL + `/accounts/profiles/groups`, headerConfig)))
}

//Account logs
const getAccountLogs = async (accountId) => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return (await resolver(axios.get(config.BACKEND_URL + `/accounts/${accountId}/logs`, headerConfig)))
}

const getMessages = async (accountId) => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return (await resolver(axios.get(config.BACKEND_URL + `/accounts/${accountId}/messages`, headerConfig)))
}

export default {
    getAccounts,
    listAccountsSummary,
    getAccountById,
    getAccountsByImei,
    getAccountLogs,
    createAccount,
    updateAccountById,
    deleteAccountById,
    getProfiles,
    getProfilesByAccountId,
    getBlockedProfiles,
    createProfile,
    updateProfileById,
    deleteProfileById,
    getAvailableProfiles,
    getActiveProfiles,
    listProfilesGroups,
    updateAccountStatus,
    updateProfileStatus,
    getMessages
}
