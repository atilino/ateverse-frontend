import { useState, useEffect } from 'react'
import userService from '../services/users'
import authService from '../services/auth'
import { currentUser, setCurrentUser } from '../libs/userInfo'

const useUser = () => {

    const [users, setUsers] = useState([])
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        roles: []
    })


    useEffect(() => {
        userService
            .getUsers()
            .then(resultUsers => {
                setUsers(resultUsers.data)
            })
    }, [])
    const login = ({ email, password }) => {
        return authService.login(email, password)
    }

    const logout = () => authService.logout()

    const updateUser = (id, userObject) => {
        return userService
                .updateUserById(id, userObject)
                .the(resultUser => {
                    setUsers(users.concat(userObject))
                    setUser(userObject)
                })
    }

    const getUser = (id) => {
        return userService
            .getUserById(id)
            .then(resultUser => {
                setUser(resultUser.data)
            })
    }

    const findUser = (id) => {
        const foudedUser = users.filter(item => item._id === id)[0]
        setUser(foudedUser)
        return
    }

    const createUser = ({ username, email, password, roles }) => {
        return authService
            .signUp({ username, email, password, roles })
            .then(resultUser => {
                setCurrentUser({
                    username,
                    email,
                    roles,
                    token: resultUser.token
                })
            })
    }

    const deleteUser = (id) => {
        return userService
            .deleteUserById(id)
    }
    return {
        user,
        users,
        currentUser,
        login,
        logout,
        getUser,
        findUser,
        updateUser,
        createUser,
        deleteUser
    }
}

export default useUser