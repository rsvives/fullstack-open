import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

// const getId = async () => Math.max(await getAll().map(anecdote => anecdote.id)) + 1

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
const createNew = async (content) => {
  const newAnecdote = content
  console.log(newAnecdote)
  const response = await axios.post(baseUrl, { content: newAnecdote, votes: 0 })
  return response.data
}

export default { getAll, createNew }
