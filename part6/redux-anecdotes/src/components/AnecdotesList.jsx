import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import Anecdote from './Anecdote'

const AnecdotesList = () => {
  const anecdotes = useSelector(state => state.sort((a, b) => b.votes - a.votes))
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))
  }
  return (
    <>
    <h2>All the anecdotes</h2>
    {anecdotes.map(anecdote =>
        // <div key={anecdote.id}>
        //   <div>
        //     {anecdote.content}
        //   </div>
        //   <div>
        //     has {anecdote.votes}
        //     <button onClick={() => vote(anecdote.id)}>vote</button>
        //   </div>
        // </div>
        <Anecdote key={anecdote.id} anecdote={anecdote} handleVote={() => vote(anecdote.id)} />
    )}
    </>
  )
}

export default AnecdotesList
