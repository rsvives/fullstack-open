import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import Anecdote from './Anecdote'
import { setNotification } from '../reducers/notificationReducer'

const AnecdotesList = () => {
  const { anecdotes, filter } = useSelector(({ anecdotes, filter }) => { return { anecdotes, filter } })
  const filteredAnecdotes = anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
  const sortedAnecdotes = filteredAnecdotes.sort((a, b) => b.votes - a.votes)

  const dispatch = useDispatch()

  const vote = async (id) => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))
    dispatch(setNotification(`☝️ you voted for ${anecdotes.find(a => a.id === id).content}`, 2))
  }
  return (
    <>
    <h2>All the anecdotes</h2>
    <div className="anecdotes-list">
    {sortedAnecdotes.map(anecdote =>
        <Anecdote key={anecdote.id} anecdote={anecdote} handleVote={() => vote(anecdote.id)} />
    )}
    </div>
    </>
  )
}

export default AnecdotesList
