import { useMutation, useQueryClient } from '@tanstack/react-query'
import anecdotesService from '../services/anecdotesService'
import { NOTIFICATION_ACTIONS, useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({
    mutationFn: anecdotesService.createNew,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      dispatch({ type: NOTIFICATION_ACTIONS.SET, payload: `✅ New anecdote added: ${newAnecdote.content}` })
    },
    onError: (error) => {
      console.error(error)
      dispatch({ type: NOTIFICATION_ACTIONS.SET, payload: `❌ Error ocurred: ${error.response.data.error}` })
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    newAnecdoteMutation.mutate(content)
    event.target.anecdote.value = ''
    console.log('new anecdote', content)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
