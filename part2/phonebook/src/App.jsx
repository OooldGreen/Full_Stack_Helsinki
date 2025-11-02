import { useState, useEffect } from 'react'
import personService from './services/persons'
import './App.css'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import Notification from './components/Notification'

function App() {
  const [persons,setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filtBy, setFilter] = useState('')
  const [hint, setHint] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
    // axios.get('http://localhost:3001/persons').then(response => {
    //   setPersons(response.data)
    // })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const isAdded = persons.find(e => e.name === newName)
    // console.log(isAdd)

    if(isAdded) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const newObj = {...isAdded, number : newNum}
        personService.updateNum(isAdded.id, newObj).then(updatePerson => {
          setPersons(persons.map(person => person.name === newName ? updatePerson : person))
          setNewName('')
          setNewNum('')
        }).catch(err => {
          // alert('update failed.')
          setError(`Information of ${newName} has already been removed from server`)
          setTimeout(() => {
            setError(null)
          }, 5000)
          setNewName('')
          setNewNum('')
        })
      }
      // alert(`${newName} is already added to phonebook`)
    } else {
      const newObj = { name: newName, number: newNum, id: (persons.length+1).toString()}

      personService.create(newObj).then(newPerson => {
        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewNum('')
        setHint(`Added ${newObj.name}`)
        setTimeout(() => {
          setHint(null)
        }, 5000)
      }).catch(err => {
        alert('add failed')
      })
    }
  }

  const handleDelete = person => {
    // const deletObj = persons.find(person => person.id === id)
    if(window.confirm(`Delete ${person.name}?`)) {
      personService.deletePerson(person.id).then(() => {
        setPersons(persons.filter(p => p.id !== person.id))
      })
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
     <Notification message={hint} className='hint'></Notification>
     <Notification message={error} className='error'></Notification>
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
        <Persons persons={personToShow} handleDelete={handleDelete}/>
    </>
  )
}

export default App
