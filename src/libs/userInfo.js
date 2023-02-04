
//Obtain the user data from sessionStorage
export const currentUser = () =>{
    const user = JSON.parse(localStorage.getItem('user'))
    if(!user) {
        return {
            token: null
        }
    }
    return user
}

//Set the user data from sessionStorage
export const setCurrentUser = ({ username, email, roles, token }) =>{
    sessionStorage.setItem('username', JSON.stringify(username))
    sessionStorage.setItem('email', JSON.stringify(email)),
    sessionStorage.setItem('roles', JSON.stringify(roles))
    sessionStorage.setItem('token', JSON.stringify(token))
}

export const deleteCurrentUser = () => {
    console.log('delete current user')
    localStorage.setItem('user', null)
}
