const Header = (props)=>{
    console.log('header args:',props.course);
    return(
        <h1>{props.course}</h1>
    )
}
export default Header