import NewAnecdoteForm from './components/NewAnecdoteForm'
import AnecdotesList from './components/AnecdotesList'

const App = () => {
  return (
    <div>
      <h1>Anecdotes App</h1>
      <AnecdotesList></AnecdotesList>
      <NewAnecdoteForm></NewAnecdoteForm>
    </div>
  )
}

export default App
