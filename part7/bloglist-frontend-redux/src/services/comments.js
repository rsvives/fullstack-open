import axios from 'axios'
const baseUrl = '/api/blogs'

// let token = null

// const setToken = (newToken) => {
//   token = `Bearer ${newToken}`
// }

// const getAll = async () => {
//   const request = await axios.get(baseUrl)
//   return request.data
// }

const createNewComment = async ({ content, blogId }) => {
  // const headers = {
  //   Authorization: token
  // }
  const response = await axios.post(`${baseUrl}/${blogId}/comments`, {
    content
  })
  return response.data
}

export default { createNewComment }
