import { createSlice } from '@reduxjs/toolkit'
// import anecdotesService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addAnecdote (state, action) {
      // const content = action.payload
      // const newNote = {
      //   // id: anecdotesService.getId(),
      //   content,
      //   votes: 0
      // }

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

export const { voteAnecdote, addAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
