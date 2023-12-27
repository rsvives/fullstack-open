const Part=(props)=>{
    console.log('part props', props);
    return(
        <p>{props.name} {props.exercises}</p>
    )
}
export default Part
