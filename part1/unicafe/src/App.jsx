import { useState } from 'react'
// import './App.css'

const Button = ({handleClick, text}) => (
    <button onClick = {handleClick}>
      {text}
    </button>
)

const StatisticsLine = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad

  if(all === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  } 

  const average = all === 0 ? 0 : (good - bad)/all
  const positive = all === 0 ? 0 : good/all * 100

  return (
    <table>
      <tbody>
        <StatisticsLine text = 'good' value = {good}></StatisticsLine>
        <StatisticsLine text = 'neutral' value = {neutral}></StatisticsLine>
        <StatisticsLine text = 'bad' value = {bad}></StatisticsLine>
        <StatisticsLine text = 'all' value = {all}></StatisticsLine>
        <StatisticsLine text = 'average' value = {average}></StatisticsLine>
        <StatisticsLine text = 'positive' value = {positive + '%'}></StatisticsLine>
      </tbody> 
    </table>
  )
}


function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  return (
    <>
      <h1>give feedback</h1>
      <Button text = 'good' handleClick = {() => setGood(good + 1)}></Button>
      <Button text = 'neutral' handleClick = {() => setNeutral(neutral + 1)}></Button>
      <Button text = 'bad' handleClick = {() => setBad(bad + 1)}></Button>
       
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>

    </>
  )
}

export default App
