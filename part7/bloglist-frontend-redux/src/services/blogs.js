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
const updateBlog = async ({ ...blog }) => {
  const { user } = blog
  blog.user = user.id
  // console.log('blog service, props to update:', blog)
  const response = await axios.put(`${baseUrl}/${blog.id}`, { ...blog })
  return response.data
}

const deleteBlog = async (id) => {
  const headers = {
    Authorization: token
  }
  const response = await axios.delete(`${baseUrl}/${id}`, { headers })
  return response.data
}

export default { getAll, createNew, setToken, updateBlog, deleteBlog }
