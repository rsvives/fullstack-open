import { useEffect, useState } from 'react'
import NewContact from './components/NewContact'
import SearchFilter from './components/SearchFilter'
import ContactsList from './components/ContactsList'
import personService from './services/person'
import Notification from './components/Notification'

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
  const [notification, setNotification] = useState({
    message: null,
    status: null
  })

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

    const newPerson = {
      // id: persons.length + 1,
      name: newName,
      number: newNumber
    }

    if (
      duplicates &&
      window.confirm(
        `${duplicates.name} is already on the phonebook, do you want to replace the old number with a new one?`
      )
    ) {
      // console.log(duplicates)
      personService
        .update(duplicates.id, newPerson)
        .then((returnedPerson) => {
          setPersons(
            persons.map((p) =>
              p.id !== returnedPerson.id ? p : returnedPerson
            )
          )
          const notification = {
            message: `🔄 ${returnedPerson.name} details updated`,
            status: 'success'
          }
          setNotification(notification)
          setTimeout(
            () => setNotification({ message: null, status: null }),
            3000
          )
        })
        .catch((error) => {
          // console.error(error)
          const notification = {
            message: `❌ ${newPerson.name} was already updated. Details: ${error.message} `,
            status: 'error'
          }
          setNotification(notification)
          setTimeout(
            () => setNotification({ message: null, status: null }),
            3000
          )
        })
    } else if (!duplicates) {
      personService
        .create(newPerson)
        .then((returnedPerson) => {
          console.log('person added', returnedPerson)
          setPersons([...persons].concat(returnedPerson.person))

          const notification = {
            message: returnedPerson.message,
            status: 'success', 
            returnedPerson
          }
          setNotification(notification)
          setNewName('')
          setNewNumber('')
          setTimeout(
            () => setNotification({ message: null, status: null }),
            3000
          )
        })
        .catch((error) => {
          const notification = {
            message: `❌ ${newPerson.name} already exists. Details: ${error.message} `,
            status: 'error'
          }
          setNotification(notification)
          setTimeout(
            () => setNotification({ message: null, status: null }),
            3000
          )
        })
    }
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

  const handleRemove = (id) => {
    console.log('remove', id)
    const person = persons.find((p) => p.id === id)
    const result = window.confirm(
      `Are you sure that you want to remove ${person.name} from the phonebook?`
    )
    if (result) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id))
        })
        .catch((error) => {
          // console.error(error)
          const notification = {
            message: `❌ ${person.name} already removed from server. Details: ${error.message} `,
            status: 'error'
          }
          setNotification(notification)
          setTimeout(
            () => setNotification({ message: null, status: null }),
            3000
          )
          setPersons(persons.filter((p) => p.id !== id))
        })
    }
  }

  return (
    <div>
      <Notification notification={notification} />
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

      <ContactsList persons={filteredPersons} handleRemove={handleRemove} />
    </div>
  )
}

export default App
