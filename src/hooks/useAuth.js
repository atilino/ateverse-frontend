import { useState } from "react"
import { currentUser, deleteCurrentUser, setCurrentUser } from "../libs/userInfo"
import authService from "../services/auth"


const useAuth = () => {
  const { token } = currentUser()
  const [isAuthenticated, setIsAuthenticated] = useState(token !== undefined)

  const login = async ({ email, password }) => {
    const result = await authService.login(email, password)
    if (!result.error) {
      setCurrentUser({
        username: result.data.username,
        email: result.data.email,
        roles: result.data.roles,
        token: result.data.token
      })
      setIsAuthenticated(true)
    }
    return result
  }

  const logout = () => {
    deleteCurrentUser()
    setIsAuthenticated(false)
  }

  return {
    isAuthenticated,
    login,
    logout
  }
}

export default useAuth
