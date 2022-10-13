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
export const getRoles = async () =>{
    return await resolver(axios.get(config.BACKEND_URL + '/roles', headers))
}
export const createRole = async (data) =>{
    return await resolver(axios.post(config.BACKEND_URL + `/roles`, data, headers))
}