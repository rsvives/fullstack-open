import NewAnecdoteForm from './components/NewAnecdoteForm'
import AnecdotesList from './components/AnecdotesList'
import Filter from './components/Filter'

const App = () => {
  return (
    <div>
      <h1>Anecdotes App</h1>
      <Filter/>
      <AnecdotesList></AnecdotesList>
      <NewAnecdoteForm></NewAnecdoteForm>
    </div>
  )
}

export default App
