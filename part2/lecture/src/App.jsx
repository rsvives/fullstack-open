import Note from './components/Note'

const App = (props) => {
  const { notes } = props

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((el) => (
          <Note key={el.id} content={el.content}></Note>
        ))}
      </ul>
    </div>
  )
}

export default App
