import { useState } from 'react'

const WinningAnecdote = ({ anecdotes, votes, getWinningAnecdoteIndex }) => {

  let index = 0

  if (Object.keys(votes).length === 0) {
    index = 0
  } else {
    index = getWinningAnecdoteIndex(votes)
  }

  return (
    <p>
      {anecdotes[index]}
      <br />
      has {votes[index] ?? 0} votes
    </p>
  )
}

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)

  const [votes, setVotes] = useState({})

  const getWinningAnecdoteIndex = (votes) => (
    Object.keys(votes).reduce((a, b) => votes[a] > votes[b] ? a : b)
  )

  const handleNextAnecdote = () => {
    const newIndex = Math.floor(Math.random() * anecdotes.length)

    setSelected(newIndex)
  }

  const handleVote = () => {
    setVotes({ ...votes, [selected]: votes[selected] ? votes[selected] + 1 : 1 })
  }

  return (
    <div>
      <h1>
        Anecdote of the day
      </h1>
      <p>
        {anecdotes[selected]} <br />
        has {votes[selected] ?? 0} votes
      </p>
      <span>
        <Button text={'vote'} handleClick={() => handleVote(selected)} />
        <Button text={'next anecdote'} handleClick={handleNextAnecdote} />
      </span>
      <h1>
        Anecdote with most votes
      </h1>
      <WinningAnecdote
        anecdotes={anecdotes}
        getWinningAnecdoteIndex={getWinningAnecdoteIndex}
        votes={votes}
      />
    </div>
  )
}

export default App