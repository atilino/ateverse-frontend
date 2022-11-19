import { useNavigate } from "react-router-dom"
import authService from "../services/auth"
import { useLocalStorage } from "./useLocalStorage"

const useAuth = () => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  const login = async ({ email, password }) => {
    const result = await authService.login(email, password)
    if(!result.error) {
      setUser(result.data)
      navigate("/")
    }
    return result
  };

  const logout = () => {
    setUser(null)
    navigate("/login", { replace: true })
  };

  return {
    user,
    login,
    logout,
    isAdmin: user?.roles.find(role => role.name === 'admin') !== undefined,
    isModerator: user?.roles.find(role => role.name === 'moderator') !== undefined,
  }
};

export default useAuth
