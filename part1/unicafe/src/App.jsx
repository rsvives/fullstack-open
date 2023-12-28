import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [score, setScore]=useState(0)
  const [all, setAll]=useState(0)

  const addGood=()=>{
    setGood(good+1)
    setAll(all+1)
    setScore(score+1)
  }
  const addNeutral=()=>{
    setNeutral(neutral+1)
    setAll(all+1)
    setScore(score+0) //redundant but clearer
  }
  const addBad=()=>{
    setBad(bad+1)
    setAll(all+1)
    setScore(score-1)
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
      <p>all: {all}</p>
      <p>average: {all===0?0:score/all}</p>
      <p>positive: {all===0?0:good*100/all}%</p>
    </div>
  )
}

export default App