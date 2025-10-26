import { useState } from 'react'
import './App.css'

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Anecdote = ({anecdotes, vote, selected}) => (
  <div>
    <p>{anecdotes[selected]}</p>
    <p>has {vote[selected]} votes</p>
  </div> 
)

function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(() => new Array(anecdotes.length).fill(0))

  const handleVote = () => {
    setVote(vote.map((v,i) => i === selected ? v + 1 : v))
  }

  const getNextAnecdote = () => {
    const rdm = Math.floor(Math.random() * anecdotes.length)
    setSelected(rdm)
  }

  const max = Math.max(...vote)
  const topIndex = vote.indexOf(max)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdotes={anecdotes} vote={vote} selected={selected}></Anecdote>
      <Button text = 'vote' onClick = {handleVote}></Button>
      <Button text = 'next anecdote' onClick = {getNextAnecdote}></Button>

      <h1>Anecdote with most votes</h1>
      {max === 0 ? (
        <p>no vote</p>
      ) : (
        <div>
          <Anecdote anecdotes={anecdotes} vote={vote} selected={topIndex}></Anecdote>
        </div>)
      }
      
    </div>
  )
}

export default App
