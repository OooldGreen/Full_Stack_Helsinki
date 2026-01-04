import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, voteForAnecdote } from './request'

import { useContext } from 'react'
import NotificationContext from './NotificationContext'

const App = () => {
  const { notificationDispatch } = useContext(NotificationContext)
  const queryClient = useQueryClient()

  const handleVoteMutation = useMutation({
    mutationFn: voteForAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      const updatedAnecdotes = anecdotes.map((a) => a.id === updatedAnecdote.id ? updatedAnecdote : a)
      const sortedAnecdotes = updatedAnecdotes.sort((a, b) => b.votes - a.votes)
      queryClient.setQueryData(['anecdotes'], sortedAnecdotes)
    }
  })

  const handleVote = (anecdote) => {
    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    handleVoteMutation.mutate(updatedAnecdote)
    notificationDispatch({ type: 'VOTE', payload: `anecdote '${anecdote.content}' voted` })
    setTimeout(() => {
      notificationDispatch({ type: 'CLEAR' })
    }, 5000)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    select: (data) => [...data].sort((a, b) => b.votes - a.votes)
  })

  if(result.isLoading) {
    return <div>loading data...</div>
  }

  if(result.isError) {
    return <div>anecdote service not available due to problem in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
