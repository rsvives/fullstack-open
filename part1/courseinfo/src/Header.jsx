const Header = (props)=>{
    console.log('header props:',props);
    return(
        <h1>{props.course}</h1>
    )
}
export default Header