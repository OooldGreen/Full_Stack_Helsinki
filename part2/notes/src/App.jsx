import { useState, useEffect } from 'react'
import noteService from './services/notes'
import './App.css'
import Note from './components/Note'
import Notification from './components/Notification'

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br/>
      <em>Note app, Department of Computer Science, University of Helsinki 2022</em>
    </div>
  )
}


function App() {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('some error happened...')

  const hook = ()  => {
    // console.log('effect')
    // axios.get('http://localhost:3001/notes').then(response => {
    //   // console.log('promise fulfilled')
    //   setNotes(response.data)
    // })
    noteService.getAll().then(initialNotes => {
      setNotes(initialNotes)
    })
  }
  useEffect(hook, [])

  const addNote = (event) => {
    event.preventDefault()
    // console.log('button clicked', event.target)
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: note.length+1
    }

    noteService.create(noteObject).then(returednNote => {
      setNotes(notes.concat(returednNote))
      setNewNote('')
    })
    
  }

  const noteToShow = showAll ? notes : notes.filter(note => note.important === true)

  const handleNoteChange = event => {
    // console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = id => {
    // console.log('importance of ' + id + ' needs to be toggled')
    // const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changeNote = {...note, important: !note.important}

    // axios.put(url, changeNote).then(response => {
    //   setNotes(notes.map(n => n.id !== id ? n : response.data))
    // })

    noteService.update(id, changedNote).then(returnedNote => {
      setNotes(notes.map(note => note.id != id ? note : returnedNote))
    }).catch(error => {
      setErrorMessage(`the note '${note.content}' was already deleted from server`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setNotes(notes.filter(n => n.id !== id))
    })
  }

  return (
    <>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show { showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {noteToShow.map(note => 
          <Note 
            key={note.id} 
            note={note} 
            toggleImportance={() => toggleImportanceOf(note.id)}
          ></Note>
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type='submit'>save</button>
      </form>
      <Footer/>
    </>
  )
}

export default App
