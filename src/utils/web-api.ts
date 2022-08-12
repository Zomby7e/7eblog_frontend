import axios from 'axios'
// Host name/IP address of the backend.
const apiHost = 'http://127.0.0.1:8090'

export const getReadData = (id: string) => {
  return axios.get(apiHost + '/read?id=' + id)
}
