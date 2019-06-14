import axios from 'axios'
import {message} from 'antd'

const Axios = axios.create({
  baseURL: 'http://111.231.55.237:3001',
  // baseURL: 'http://127.0.0.1:3001',
  timeout: 10000
})

type Picks<T, K extends keyof T> = {
  [P in K]: T[P]
}

interface Configs {
  [propName: string]: any
}

type PickConfig = Picks<Configs, 'url' | 'headers'>

Axios.interceptors.request.use((config: Partial<PickConfig>) => {
  if (!config.url.includes('register') && !config.url.includes('login')) {
    config.headers = {
      Authorization: 'Bearer ' + window.localStorage.token
    }
  }

  return config
}, (error: any) => {
  return Promise.reject(error)
})

Axios.interceptors.response.use((response) => {
  // Do something with response data
  return response
}, (error) => {
  if (error.response && error.response.status === 401) {
    window.localStorage.removeItem('token')
    window.location.href = '/#/login'
    return void window.location.reload()
  }
  if (error.response && error.response.status === 500) {
    return void message.error(error.response.data.message)
  }
  // Do something with response error
  return Promise.reject(error)
})

export default Axios
