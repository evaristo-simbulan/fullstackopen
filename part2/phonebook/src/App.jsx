import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'
import './index.css'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [messageType, setMessageType] = useState('info')

  const hook = () => {
    personService.getAll()
      .then(allPersons => setPersons(allPersons))
  }

  useEffect(hook, [])


  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  const checkIfPersonExists = (name) => {
    return persons.some(p => p.name === name)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const name = newName.trim()
    if (!name) {
      return
    }
    if (checkIfPersonExists(name)) {
      if (window.confirm(`${name} is already added on to phonebook, replace the old number with the new one?`)) {
        const person = persons.find(p => p.name === name)
        const changedPerson = { ...person, number: newNumber }
        personService.updateItem(person.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id === returnedPerson.id ? returnedPerson : p))
            setNotification(`Updated ${returnedPerson.name}`)
            setMessageType('info')
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
          .catch(() => {
            setNotification(`Information of ${person.name} has already been removed from server`)
            setMessageType('error')
            setTimeout(() => {
              setNotification(null)
            }, 5000)
            setPersons(persons.filter(p => p.id !== person.id))
          })
      }
    } else {
      const personObject = {
        name: name,
        number: newNumber
      }
      personService.create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNotification(`Added ${returnedPerson.name}`)
          setMessageType('info')
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })

    }

    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setFilter(event.target.value)
  }

  const handleDeletePersonPopUp = (person) => {
    if (window.confirm(`delete ${person.name}`)) {
      personService.deleteItem(person.id)
        .then(() => setPersons(persons.filter(p => p.id !== person.id)))
        .catch(() => {
          setNotification(`Information of ${person.name} has already been removed from server`)
          setMessageType('error')
          setTimeout(() => {
            setNotification(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== person.id))
        })
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} messageType={messageType} />
      <Filter value={filter} onSearch={handleSearchChange} />
      <h2>add a new</h2>
      <PersonForm onAddPerson={addPerson} onNameChange={handleNameChange} onNumberChange={handleNumberChange}
        newName={newName} newNumber={newNumber} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} onDeletePerson={handleDeletePersonPopUp} />
    </div>
  )
}

export default App
