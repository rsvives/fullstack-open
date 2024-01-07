import { useState, useEffect } from 'react'
import Note from './components/Note'

import noteService from './services/notes'

const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  const hook = () => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes)
    })
  }

  useEffect(hook, [])

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

  return (
    <div>
      <h1>Notes</h1>
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
    </div>
  )
}

export default App
