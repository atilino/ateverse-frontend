import axios from 'axios'
import config from '../config'
import resolver from './resolver'
import { deleteCurrentUser } from '../libs/userInfo'
import { setCurrentUser } from '../libs/userInfo';


const login = async (email, password) => {
    const result = await resolver(axios.post(config.BACKEND_URL + '/auth/signIn', { email, password }))
    if (!result.error) {
        setCurrentUser(result.data)
    }
    return ({ error : result.error})
}

const signUp = async ({ username, email, password, roles }) => {
    return await resolver(axios.post(config.BACKEND_URL + `/auth/signUp`, { username, email, password, roles }))
}

const logout = async () => {
    deleteCurrentUser()
}

export default {
    login,
    signUp,
    logout
}
