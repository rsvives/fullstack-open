import StatisticsLine from "./StatisticsLine"

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
            <table>
                <tbody>
                    <StatisticsLine text={'good'} value={good}/>
                    <StatisticsLine text={'neutral'} value={neutral}/>
                    <StatisticsLine text={'bad'} value={bad}/>
                    <StatisticsLine text={'all'} value={all}/>
                    <StatisticsLine text={'average'} value={score/all}/>
                    <StatisticsLine text={'positive'} value={good*100/all+'%'}/>
                </tbody>
            </table>

            
        </div>
    )
}
export default Statistics