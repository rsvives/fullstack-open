import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood=()=>{
    setGood(good+1)
  }
  const addNeutral=()=>{
    setNeutral(neutral+1)
  }
  const addBad=()=>{
    setBad(bad+1)
  }

  return (
    <div>
      <h1>Unicafe</h1>
      <h2>Give feedback</h2>
      <button onClick={addGood}>good</button>
      <button onClick={addNeutral}>neutral</button>
      <button onClick={addBad}>bad</button>
      <h2>Statistics</h2>
      <p>good:  {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
    </div>
  )
}

export default App