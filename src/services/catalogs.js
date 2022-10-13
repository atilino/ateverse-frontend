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

export const getDeviceStatus = async () =>{
    return await resolver(axios.get(config.BACKEND_URL + '/catalogs/device-status', headers))
}