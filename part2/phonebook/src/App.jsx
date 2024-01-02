import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { id: 1, name: 'Arto Hellas', number: '040-123456' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
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
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <form>
        <div>
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
          </div>
          <div>
            <label htmlFor="number">Number:</label>
            <br />
            <input
              type="phone"
              id="number"
              name="number"
              value={newNumber}
              onChange={handleNewNumber}
              pattern="[0-9]{9}"
            />
          </div>
          <button type="submit" onClick={addNewPerson}>
            add
          </button>
        </div>
      </form>
      {/* <p>debug: {newName}</p> */}
      <h2>Numbers</h2>
      {persons.map((person) => (
        <div key={person.id}>
          {person.name}: {person.number}
        </div>
      ))}
    </div>
  )
}

export default App
