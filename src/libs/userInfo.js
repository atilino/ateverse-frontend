
//Obtain the user data from sessionStorage
export const currentUser = () =>{
    const username = JSON.parse(sessionStorage.getItem('username'))
    const email = JSON.parse(sessionStorage.getItem('email'))
    const roles = JSON.parse(sessionStorage.getItem('roles'))
    const token = JSON.parse(sessionStorage.getItem('token'))
    const isAdmin = roles && roles.map(role => role.name === 'admin')[0]
    const isModerator = roles && roles.map(role => role.name === 'moderator')[0]

    return({ username, email, roles, token, isAdmin, isModerator })
}

//Set the user data from sessionStorage
export const setCurrentUser = ({ username, email, roles, token }) =>{
    sessionStorage.setItem('username', JSON.stringify(username))
    sessionStorage.setItem('email', JSON.stringify(email)),
    sessionStorage.setItem('roles', JSON.stringify(roles))
    sessionStorage.setItem('token', JSON.stringify(token))
}

export const deleteCurrentUser = () => {
    sessionStorage.removeItem('username')
    sessionStorage.removeItem('email')
    sessionStorage.removeItem('roles')
    sessionStorage.removeItem('token')
}