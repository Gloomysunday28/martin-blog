import axios from 'axios'

const Axios = axios.create({
  // baseURL: 'http://111.231.55.237:3001',
  baseURL: 'http://127.0.0.1:3001',
  timeout: 10000
  // transformRequest(data) {
  //   return qs.stringify(data)
  // }
})

Axios.interceptors.request.use((config: any) => {
  if (!config.url.includes('register') && !config.url.includes('login')) {
    config.headers = {
      Authorization: 'Bearer ' + window.localStorage.access_token
    }
  }

  return config
}, (error: any) => {
  return Promise.reject(error)
})

// Axios.interceptors.response.use((response) => {
//   // Do something with response data
//   return response
// }, (error) => {
//   if (error.response && error.response.status === 401) {
//     return void router.replace({name: 'MartinLogin'})
//   }
//   if (error.response && error.response.status === 500) {
//     return void martin.$message.error(error.response.data.message)
//   }
//   // Do something with response error
//   return Promise.reject(error)
// })

export default Axios
