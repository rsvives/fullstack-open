import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { clearMessage, setMessage } from '../reducers/notificationReducer'

const NewAnecdoteForm = () => {
  const dispatch = useDispatch()

  const addNew = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    console.log('add new note', content)
    dispatch(createAnecdote(content))
    event.target.anecdote.value = ''
    dispatch(setMessage('✅ new anecdote created'))
    setTimeout(() => dispatch(clearMessage()), 5000)
  }
  return (
    <>
    <h2>create new</h2>
      <form onSubmit={addNew}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default NewAnecdoteForm
