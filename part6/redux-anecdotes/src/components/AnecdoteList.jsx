import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    if (state.filter === 'ALL') {
      return state.anecdotes
    }

    const filterWord = state.filter
    const filteredAnecdotes = state.anecdotes.filter(a => a.content.includes(filterWord))
    return filteredAnecdotes
  })

  const vote = (anecdote) => {
    dispatch(voteForAnecdote(anecdote))
    dispatch(setNotification(`You voted for '${anecdote.content}'`, 5000))
  }

  return (
    <div>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList