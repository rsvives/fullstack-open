import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

// const getId = async () => Math.max(await getAll().map(anecdote => anecdote.id)) + 1

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}
const createNew = async (content) => {
  const response = await axios.post(baseUrl, { content, votes: 0 })
  return response.data
}
const update = async (anecdote) => {
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, { ...anecdote })
  return response.data
}

export default { getAll, getById, createNew, update }
