import './App.css'
import NewAnecdoteForm from './components/NewAnecdoteForm'
import AnecdotesList from './components/AnecdotesList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import anecdotesService from './services/anecdotes'
import { setAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    anecdotesService.getAll().then(anecdotes => dispatch(setAnecdotes(anecdotes)))
  })
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
