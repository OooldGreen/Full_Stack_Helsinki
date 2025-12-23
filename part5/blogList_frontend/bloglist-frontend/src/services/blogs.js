import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token =  `Bearer ${newToken}`
}

const getAll = (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }

  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

const create = async newObj => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObj, config)
  return response.data
}

export default { getAll, setToken, create }