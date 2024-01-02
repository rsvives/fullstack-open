import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { id: 1, name: 'Arto Hellas', number: '040-123456' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const addNewPerson = (ev) => {
    ev.preventDefault()

    // check if name or number is empty
    if (newName === '' || newNumber === '') {
      alert('Please fill in the fields')
      return
    }

    // check if name already exists
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

  const handleNameFilter = (ev) => {
    setFilterName(ev.target.value)
  }

  const filteredPersons =
    filterName === ''
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filterName.toLowerCase())
        )

  return (
    <div>
      <h1>Phonebook</h1>
      <h2>Add new</h2>
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
      </form>
      <h2>Look for someone</h2>
      <label htmlFor="filter-name">Show people named: </label>
      <input
        id="filter-name"
        type="text"
        value={filterName}
        onChange={handleNameFilter}
      />

      <p>debug: {filterName}</p>
      <h2>Numbers</h2>

      {filteredPersons.map((p) => (
        <div key={p.id}>
          {p.name}: {p.number}
        </div>
      ))}
    </div>
  )
}

export default App
