import { useState, useEffect } from 'react'
import Note from './components/Note'
import login from './services/login'

import noteService from './services/notes'

const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const fetchNotes = () => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes)
    })
  }

  useEffect(fetchNotes, [])

  const getUserFromLocalStorage = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }

  useEffect(getUserFromLocalStorage, [])

  const handleNoteChange = (event) => {
    // console.log(event.target.value)
    setNewNote(event.target.value)
  }
  const addNote = (event) => {
    event.preventDefault()
    // console.log('note added', newNote)
    const note = {
      content: newNote,
      important: false,
      id: notes.length + 1
    }
    noteService.create(note).then((newNote) => {
      // console.log(newNote)
      setNotes(notes.concat(newNote))
      setNewNote('')
    })
  }

  const notesToShow = showAll ? notes : notes.filter((n) => n.important)

  const toggleDisplayAll = () => {
    console.log('toggle', showAll)
    setShowAll(!showAll)
  }

  const toggleImportanceOf = ({ id }) => {
    const note = notes.find((n) => n.id === id)
    const changedNote = { ...note, important: !note.important }
    noteService.update(id, changedNote).then((returnedNote) => {
      // console.log('note changed', returnedNote)
      setNotes(notes.map((n) => (n.id !== id ? n : returnedNote)))
    })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const response = await login.login({ username, password })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(response)
      )
      noteService.setToken(response.token)
      setUser(response)
      console.log(response)
    } catch (exception) {
      console.error('wrong credentials')
    }
  }
  const logout = async (event) => {
    event.preventDefault()
    console.log('logging out')
    setUser(null)
  }

  const loginForm = () => (
     <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            required
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            required
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
  )

  const notesComponent = () => (

    <>
     <input type="checkbox" onClick={toggleDisplayAll} id="showAll" />
      <label htmlFor="showAll">Show only important</label>
      <ul>
        {notesToShow.map((el) => (
          <Note
            key={el.id}
            content={el.content}
            important={el.important}
            toggleImportance={() => {
              toggleImportanceOf(el)
            }}
          ></Note>
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input type="text" value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
      <form onSubmit={logout}>
        <button type="submit">logout</button>
      </form>
    </>
  )

  return (
    <div>
      <h1>Notes</h1>
      <hr />
      {user === null ? loginForm() : notesComponent() }

    </div>
  )
}

export default App
