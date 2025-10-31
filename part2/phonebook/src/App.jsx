import { useState } from 'react'
// import './App.css'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filtBy, setFilter] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const isAdd = persons.find(e => e.name === newName)
    // console.log(isAdd)

    if(isAdd) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newObj = { name: newName, number: newNum, id: persons.length+1}
      setPersons(persons.concat(newObj))
      setNewName('')
      setNewNum('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    setNewNum(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
    // console.log(event.target.value)
  } 

  const personToShow = filtBy === '' 
    ? persons : 
    persons.filter(person => 
      person.name.toLowerCase().includes(filtBy.toLowerCase())
    )

  return (
    <>
     <h2>Phonebook</h2>
     <Filter value={filtBy} onChange={handleFilter}/>

     <h2>Add a new</h2>
     <PersonForm 
      onSubmit={addName} 
      newName={newName} 
      handleNameChange={handleNameChange}
      newNum={newNum}
      handleNumChange={handleNumChange}
    />

      <h2>Numbers</h2>
        <Persons persons={personToShow}/>
    </>
  )
}

export default App
