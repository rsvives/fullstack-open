const Header = (props)=>{
    console.log('Header props:',props);
    return(
        <h1>{props.courseName}</h1>
    )
}
export default Header