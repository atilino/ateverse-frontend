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

const getAccounts = async () => {
    return (await resolver(axios.get(config.BACKEND_URL + '/accounts', headers)))
}
const getAccountsByImei = async (imei) => {
    return (await resolver(axios.get(config.BACKEND_URL + `/accounts?imei=${imei}`, headers)))
}
const getAccountById = async (id) => {
    return (await resolver(axios.get(config.BACKEND_URL + `/accounts/${id}`, headers)))
}
const updateAccountById = async (id, data) => {
    return (await resolver(axios.put(config.BACKEND_URL + `/accounts/${id}`, data, headers)))
}
const createAccount = async (data) => {
    return (await resolver(axios.post(config.BACKEND_URL + '/accounts', data, headers)))
}
const deleteAccountById = async (id) => {
    return (await resolver(axios.delete(config.BACKEND_URL + `/accounts/${id}`, headers)))
}

//Account profiles
const getProfiles = async (network) => {
    const endpoint = network ? `/accounts/profiles?networkId=${network}` : '/accounts/profiles'
    return (await resolver(axios.get(config.BACKEND_URL + endpoint, headers)))
}

const getProfilesByAccountId = async (accountId) => {
    return (await resolver(axios.get(config.BACKEND_URL + `/accounts/${accountId}/profiles`, headers)))
}
const getBlockedProfiles = async (networkId) => {
    return (await resolver(axios.get(config.BACKEND_URL + `/accounts/profiles/blocked?networkId=${networkId}`, headers)))
}
const updateProfileById = async (id, data) => {
    return (await resolver(axios.put(config.BACKEND_URL + `/accounts/profiles/${id}`, data, headers)))
}
const createProfile = async (data) => {
    return (await resolver(axios.post(config.BACKEND_URL + '/accounts/profiles', data, headers)))
}
const deleteProfileById = async (id) => {
    return (await resolver(axios.delete(config.BACKEND_URL + `/accounts/profiles/${id}`, headers)))
}
const getActiveProfiles = async (network) => {
    return (await resolver(axios.get(config.BACKEND_URL + `/accounts/profiles/${network}/active`, headers)))
}
const getAvailableProfiles = async (network) => {
    return (await resolver(axios.get(config.BACKEND_URL + `/accounts/${network}/available`, headers)))
}
const getProfileGroups = async (id) => {
    return (await resolver(axios.get(config.BACKEND_URL + `/accounts/profiles/${id}/groups`, headers)))
}

//Account logs
const getAccountLogs = async (accountId) => {
    return (await resolver(axios.get(config.BACKEND_URL + `/accounts/${accountId}/logs`, headers)))
}

export default {
    getAccounts,
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
    getProfileGroups
}