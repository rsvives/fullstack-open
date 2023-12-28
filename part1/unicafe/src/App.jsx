import { useState } from 'react'
import Statistics from './components/Statistics'
import Button from './components/Button'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [score, setScore]=useState(0)
  const [all, setAll]=useState(0)

  const statistics = {
    good,
    neutral,
    bad,
    score,
    all
  }

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
      <Button onClick={addGood} text={'good'}/>
      <Button onClick={addNeutral} text={'neutral'}/>
      <Button onClick={addBad} text={'bad'}/>

      <Statistics statistics={statistics}/>

    </div>
  )
}

export default App