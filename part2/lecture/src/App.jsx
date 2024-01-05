import { useState, useEffect } from 'react'
import Note from './components/Note'
import axios from 'axios'

const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    axios.get('http://localhost:3001/notes').then((response) => {
      console.log(response)
      setNotes(response.data)
    })
  }, [])

  console.log('render', notes.length, 'notes')

  const handleNoteChange = (event) => {
    // console.log(event.target.value)
    setNewNote(event.target.value)
  }
  const addNote = (event) => {
    event.preventDefault()
    console.log('note added', newNote)
    const note = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1
    }
    setNotes(notes.concat(note))
    setNewNote('')
  }
  const notesToShow = showAll ? notes : notes.filter((n) => n.important)

  const toggleDisplayAll = () => {
    console.log('toggle', showAll)
    setShowAll(!showAll)
  }
  return (
    <div>
      <h1>Notes</h1>
      <input type="checkbox" onClick={toggleDisplayAll} id="showAll" />
      <label htmlFor="showAll">Show only important</label>
      <ul>
        {notesToShow.map((el) => (
          <Note key={el.id} content={el.content}></Note>
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
