import axios from "axios"
import { currentUser } from "../libs/userInfo"
import ResponseInterceptor from "./response.interceptor"

export default function PrivateInterceptor() {
  axios.interceptors.request.use(request => {
    const { token } = currentUser()
    request.headers = {
      'x-access-token': token
    }
    return request
  }, error => {
    console.error(error)
    Promise.reject(error)
  })
}