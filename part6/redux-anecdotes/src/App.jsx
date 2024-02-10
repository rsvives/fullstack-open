import './App.css'
import NewAnecdoteForm from './components/NewAnecdoteForm'
import AnecdotesList from './components/AnecdotesList'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  return (
    <main>
      <h1>Anecdotes App</h1>
      <Notification/>
      <Filter/>
      <AnecdotesList></AnecdotesList>
      <NewAnecdoteForm></NewAnecdoteForm>
    </main>
  )
}

export default App
