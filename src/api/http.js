import axios from 'axios'
import cookie from 'cookiejs'

const axiosR = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
})

axiosR.interceptors.request.use(
  (config) => {
    if (cookie.get('token')) {
      config.headers['Authorization'] = `Bearer ${cookie.get('token')}`
      config.headers['X-Requested-With'] = 'XMLHttpRequest'
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default axiosR
