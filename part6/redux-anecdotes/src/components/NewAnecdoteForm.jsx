import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

const NewAnecdoteForm = () => {
  const dispatch = useDispatch()

  const addNew = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    console.log('add new note', content)
    dispatch(addAnecdote(content))
    event.target.anecdote.value = ''
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
