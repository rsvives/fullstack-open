import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{ id: 1, name: 'Arto Hellas' }])
  const [newName, setNewName] = useState('')

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const addNewPerson = (ev) => {
    ev.preventDefault()
    // console.log('addNewPerson')
    const duplicates = persons.find((person) => person.name === newName)

    if (duplicates) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const newPerson = {
      id: persons.length + 1,
      name: newName
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <form>
        <div>
          <label htmlFor="name">Name:</label>
          <br />
          <input
            type="text"
            id="name"
            name="name"
            value={newName}
            onChange={handleNewName}
          />
          <button type="submit" onClick={addNewPerson}>
            add
          </button>
        </div>
      </form>
      {/* <p>debug: {newName}</p> */}
      <h2>Numbers</h2>
      {persons.map((person) => (
        <div key={person.id}>{person.name}</div>
      ))}
    </div>
  )
}

export default App
