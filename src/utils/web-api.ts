import axios from 'axios'
// Host name/IP address of the backend.
const apiHost = 'http://127.0.0.1:8090'

export const getReadData = (id: string) => {
  return axios.get(apiHost + '/read?id=' + id)
}

export const getNoteData = (id: string) => {
  return axios.get(apiHost + '/note?id=' + id)
}

export const getReadList = (currentPage: number, pageSize: number) => {
  return axios.get(apiHost + `/pagination/read?current_page=${currentPage}&page_size=${pageSize}`)
}

export const getAboutData = () => {
  return axios.get(apiHost + '/about')
}
