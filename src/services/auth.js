import axios from 'axios'
import config from '../config'
import resolver from './resolver'


const login = async (email, password) => {
    return await resolver(axios.post(config.BACKEND_URL + '/auth/signIn', { email, password }))
}

export default {
    login,
}
