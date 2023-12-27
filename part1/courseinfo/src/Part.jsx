const Part=(props)=>{
    console.log('Part props:', props);
    return(
        <p>{props.name} {props.exercises}</p>
    )
}
export default Part
