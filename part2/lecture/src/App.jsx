import { useState, useEffect } from 'react'
import Note from './components/Note'
import axios from 'axios'

const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  const DB_URL = 'http://localhost:3001/notes'

  const hook = () => {
    axios.get(DB_URL).then((response) => {
      setNotes(response.data)
    })
  }

  useEffect(hook, [])

  const handleNoteChange = (event) => {
    // console.log(event.target.value)
    setNewNote(event.target.value)
  }
  const addNote = (event) => {
    event.preventDefault()
    console.log('note added', newNote)
    const note = {
      content: newNote,
      // important: Math.random() < 0.5,
      important: false,
      id: notes.length + 1
    }
    axios.post(DB_URL, note).then((res) => {
      console.log(res)
      setNotes(notes.concat(res.data))
      setNewNote('')
    })
  }

  const notesToShow = showAll ? notes : notes.filter((n) => n.important)

  const toggleDisplayAll = () => {
    console.log('toggle', showAll)
    setShowAll(!showAll)
  }

  const toggleImportanceOf = ({ id }) => {
    // console.log(el)
    // const copyOfNotes = notes.map(({ id, important, ...args }) => {
    //   return {
    //     id,
    //     ...args,
    //     important: id === el.id ? !important : important
    //   }
    // })
    // // console.log(copyOfNotes)
    // setNotes(copyOfNotes)
    const note = notes.find((n) => n.id === id)
    const changedNote = { ...note, important: !note.important }
    axios.put(`${DB_URL}/${id}`, changedNote).then((res) => {
      console.log('note changed', res)
      setNotes(notes.map((n) => (n.id !== id ? n : res.data)))
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
