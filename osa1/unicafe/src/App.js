import { useState } from 'react'

const HeaderText = ({ text }) => (
  <h1>
    {text}
  </h1>
)

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({ text, value, postfix }) => (
  <tr>
    <td>
      {text}
    </td>
    <td>
      {value} {postfix}
    </td>
  </tr>
)

const Statistics = ({ good, neutral, bad }) => {

  const all = good + neutral + bad

  const average = ((good - bad) / (good + neutral + bad)).toFixed(1)

  const positivePct = (good / (good + neutral + bad) * 100).toFixed(1)

  if (good + neutral + bad === 0) {
    return (
      <>
        No feedback given
      </>
    )
  }

  return (
    <table>
      <tbody>
        <StatisticLine text='good' value={good} />
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text={'all'} value={all} />
        <StatisticLine text={'average'} value={average} />
        <StatisticLine text={'positive'} value={positivePct} postfix={'%'} />
      </tbody>
    </table >
  )
}

const App = () => {
  const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 })

  const handleGood = () => {
    setFeedback({ ...feedback, good: feedback.good + 1 })
  }
  const handleNeutral = () => {
    setFeedback({ ...feedback, neutral: feedback.neutral + 1 })
  }
  const handleBad = () => {
    setFeedback({ ...feedback, bad: feedback.bad + 1 })
  }

  return (
    <div>

      <HeaderText text='give feedback'></HeaderText>

      <div>
        <Button handleClick={handleGood} text='good' />
        <Button handleClick={handleNeutral} text='neutral' />
        <Button handleClick={handleBad} text='bad' />
      </div>

      <HeaderText text='statistics'></HeaderText>

      <div>
        <Statistics
          good={feedback.good}
          neutral={feedback.neutral}
          bad={feedback.bad} />
      </div>

    </div >
  )
}

export default App