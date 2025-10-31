import { useState } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [keyword, setKeyword] = useState('')
  const personsToShow = persons.filter(person => person.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1)

  const handleNameChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    
    let hasSameName = false
    const nameObj = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    persons.map(person => {
      if(person.name === newName) hasSameName = true
      return null
    })
    // console.log(hasSameName)

    if (hasSameName) {
      alert(`${newName} is already added to phonebook`) 
    } else {
      // console.log(nameObj)
      setPersons(persons.concat(nameObj))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value)
    // console.log(keyword)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter keyword={keyword} handleKeywordChange={handleKeywordChange}/>
       
      <h3>Add a new</h3>
      <PersonForm newName={newName} newNumber={newNumber} addPerson={addPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}></PersonForm>

      <h3>Numbers</h3>
      <Persons persons={personsToShow}></Persons>
    </div>
  )
}

export default App