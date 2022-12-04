import axios from "axios"

export default function ResponseInterceptor() {
  axios.interceptors.response.use(
    response => response.data,
    error => {
      console.error(error)
      Promise.reject(error)
    }
  )
}