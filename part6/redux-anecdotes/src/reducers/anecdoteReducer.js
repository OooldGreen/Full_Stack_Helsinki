import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = anecdote => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    create(state, action) {
      state.push(action.payload)
    },
    voteFor(state, action) {
      const updatedAnecdote = action.payload
      const newAnecdotes = state.map(a => a.id === updatedAnecdote.id ? updatedAnecdote : a)
      return sortByVotes(newAnecdotes)
    },
    setAnecdotes(state, action) {
      return sortByVotes(action.payload)
    }
  }
})

const { create, voteFor, setAnecdotes }  = anecdoteSlice.actions

const sortByVotes = (state) => state.sort((a, b) => b.votes - a.votes)

export const createNew = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(create(newAnecdote))
  }
}

export const voteForAnecdote = (anecdote) => {
  return async (dispatch) => {
    const changedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    const changedList = await anecdoteService.updateVote(anecdote.id, changedAnecdote)
    dispatch(voteFor(changedList))
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export default anecdoteSlice.reducer
