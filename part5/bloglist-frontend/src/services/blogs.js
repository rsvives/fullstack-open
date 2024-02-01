import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  console.log(request.data)
  return request.data
}

const createNew = async (blog) => {
  const headers = {
    Authorization: token
  }
  const response = await axios.post(baseUrl, blog, { headers })
  return response.data
}

export default { getAll, createNew, setToken }
