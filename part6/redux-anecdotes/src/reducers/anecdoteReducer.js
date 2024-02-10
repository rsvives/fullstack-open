import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'
// import anecdotesService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addAnecdote (state, action) {
      state.push(action.payload)
    },
    updateAnecdotes (state, action) {
      const updatedAnecdote = action.payload
      return state.map(el => el.id === updatedAnecdote.id ? updatedAnecdote : el)
    },
    setAnecdotes (state, action) {
      return action.payload
    }
  }
})

export const { addAnecdote, updateAnecdotes, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    // console.log('initialize', anecdotes)
    dispatch(setAnecdotes(anecdotes))
  }
}
export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createNew(content)
    dispatch(addAnecdote(newAnecdote))
  }
}
export const voteAnecdote = (id) => {
  return async dispatch => {
    const anecdoteToUpdate = await anecdotesService.getById(id)
    // console.log(anecdoteToUpdate)
    anecdoteToUpdate.votes += 1
    const updatedAnecdote = await anecdotesService.update(anecdoteToUpdate)
    // console.log(updatedAnecdote)
    dispatch(updateAnecdotes(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer
