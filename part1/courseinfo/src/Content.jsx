import Part from "./Part"

const Content = (props)=>{
    console.log("Content props:",props)
    return(
       <div> 
           <Part name={props.courseParts[0].name} exercises={props.courseParts[0].exercises}/>
           <Part name={props.courseParts[1].name} exercises={props.courseParts[1].exercises}/>
           <Part name={props.courseParts[2].name} exercises={props.courseParts[2].exercises}/>
        </div>
    )
}
export default Content