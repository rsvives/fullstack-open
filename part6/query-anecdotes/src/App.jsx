import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import anecdotesService from './services/anecdotesService'
import { NOTIFICATION_ACTIONS, useNotificationDispatch } from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()

  const notificationDispatch = useNotificationDispatch()
  const updateAnecdoteMutation = useMutation({
    mutationFn: anecdotesService.updateAnecdote,
    onSuccess: (updated) => {
      // console.log('onSuccess', updated)
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      const updatedAnecdotes = anecdotes.map(a => a.id === updated.id ? updated : a)
      queryClient.setQueryData(['anecdotes'], updatedAnecdotes)
      // queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })
  const handleVote = (anecdote) => {
    console.log(anecdote)
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    notificationDispatch({ type: NOTIFICATION_ACTIONS.SET, payload: `☝️ You voted for: ${anecdote.content}` })
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: () => anecdotesService.getAll(),
    retry: 2
  })
  if (result.isLoading) {
    return <p>... loading</p>
  }
  if (result.isError) {
    return (<div>Anecdotes app is unavailable due to a server problem</div>)
  }

  const anecdotes = result.data
  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
