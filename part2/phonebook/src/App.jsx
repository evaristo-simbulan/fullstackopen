import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
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
      alert(`${name} is already added to phonebook`)
      return
    } else {
      const personObject = {
        name: name,
        number: newNumber,
        id: Math.max(0, ...persons.map(p => p.id)) + 1
      }
      personService.create(personObject)
        .then(returnedPerson => setPersons(persons.concat(returnedPerson)))

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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onSearch={handleSearchChange} />
      <h2>add a new</h2>
      <PersonForm onAddPerson={addPerson} onNameChange={handleNameChange} onNumberChange={handleNumberChange}
        newName={newName} newNumber={newNumber} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App
