import { useEffect, useState } from 'react'
import NewContact from './components/NewContact'
import SearchFilter from './components/SearchFilter'
import ContactsList from './components/ContactsList'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])

  const DB_URL = 'http://localhost:3001/persons'

  const hook = () => {
    axios.get(DB_URL).then((response) => {
      console.log(response)
      setPersons(response.data)
    })
  }

  useEffect(hook, [])

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
      <NewContact
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNewName}
        handleNumberChange={handleNewNumber}
        addNewPerson={addNewPerson}
      />
      <SearchFilter
        filterName={filterName}
        handleNameFilter={handleNameFilter}
      />

      <ContactsList persons={filteredPersons} />
    </div>
  )
}

export default App
