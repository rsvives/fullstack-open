const Statistics = ({statistics})=>{
    const {good,neutral,bad,all,score} = statistics

    if(all===0){
        return(
            <div>
                <h2>Statistics</h2>
                <p>No feedback given...</p>
            </div> 
        )
    }
    return(
        <div>
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
export default Statistics