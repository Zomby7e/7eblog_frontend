import Axios from 'axios'

const baseURL = 'http://127.0.0.1:8090'

const axios = Axios.create({
  baseURL,
  timeout: 5000
})

// request interceptors
axios.interceptors.request.use(response => {
  return response
}, error => {
  return Promise.reject(error)
})

// response interceptors
axios.interceptors.response.use(response => {
  return response.data
}, error => {
  if (!!error.response && !error.response.data) {
    const code = error.response.status
    // Maybe error message here in future
    console.error(new Error('Http request error: code: ' + code))
  } else {
    console.error(error)
  }
  return Promise.reject(error)
})

export default axios
