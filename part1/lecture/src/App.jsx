import { useState } from 'react'
import Counter from './components/Counter'
import Button from './components/Button'

const App = () => {

  const [ counter, setCounter ] = useState(0)
  const [clicks,setClicks] = useState({left:0,right:0})


  const add = (num)=>setCounter(counter+num)
  const setZero = ()=>setCounter(0)

  // console.log("counter:",counter);
  const addToLeft = ()=>setClicks({right:clicks.right,left:clicks.left+1})
  const addToRight = ()=>setClicks({...clicks,right:clicks.right+1}) //esto compensaría si hubiera más de dos propiedades
  return (
    <div>
      <div className="simple-counter">
        <Counter counter={counter}/>
        <Button onClick={()=>add(-1)} text={"-1"}></Button>
        <Button onClick={setZero} text={"set to zero"}></Button>
        <Button onClick={()=>add(1)} text={"+1"}></Button>
      </div>
      <div className="complex-counter">+
        <span>Left</span>
        <Counter counter={clicks.left}/>
        <Button onClick={addToLeft} text={'left + 1'}/>
        <br />
        <span>Right</span>
        <Counter counter={clicks.right}/>
        <Button onClick={addToRight} text={'right + 1'}/>
      </div>
    </div>
  )
}

export default App