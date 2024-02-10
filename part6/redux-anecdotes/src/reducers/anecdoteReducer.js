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
    voteAnecdote (state, action) {
      const id = action.payload

      const anecdoteToUpdate = state.find(el => el.id === id)
      const updatedAnecdote = {
        ...anecdoteToUpdate,
        votes: anecdoteToUpdate.votes + 1
      }
      return state.map(el => el.id === id ? updatedAnecdote : el)
    },
    setAnecdotes (state, action) {
      return action.payload
    }
  }
})

export const { addAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions

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

export default anecdoteSlice.reducer
