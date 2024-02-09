import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import Anecdote from './Anecdote'

const AnecdotesList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    const filteredAnecdotes = anecdotes.filter(a => a.content.includes(filter))
    return filteredAnecdotes.sort((a, b) => b.votes - a.votes)
  })
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))
  }
  return (
    <>
    <h2>All the anecdotes</h2>
    {anecdotes.map(anecdote =>
        <Anecdote key={anecdote.id} anecdote={anecdote} handleVote={() => vote(anecdote.id)} />
    )}
    </>
  )
}

export default AnecdotesList
