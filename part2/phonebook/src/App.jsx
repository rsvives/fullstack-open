import { useEffect, useState } from 'react'
import NewContact from './components/NewContact'
import SearchFilter from './components/SearchFilter'
import ContactsList from './components/ContactsList'
import personService from './services/person'

const App = () => {
  const [persons, setPersons] = useState([])

  const hook = () => {
    personService.getAll().then((initialPersons) => {
      console.log('get persons', initialPersons)
      setPersons(initialPersons)
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
    personService
      .create(newPerson)
      .then((returnedPerson) => {
        console.log('person added', returnedPerson)
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
      .catch((error) => {
        console.log(error.response.data)
      })
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
