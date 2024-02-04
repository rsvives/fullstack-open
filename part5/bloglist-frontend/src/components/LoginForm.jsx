import { useState } from 'react'

const LoginForm = ({ submitAction }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    await submitAction({ username, password })
    setUsername('')
    setPassword('')
  }
  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    maxWidth: 400,
    padding: 12,
    border: 'solid',
    borderWidth: 1,
    borderRadius: 4,
    margin: 'auto'
  }

  return (
    <form style={formStyle} onSubmit={handleSubmit}>
        <label htmlFor="username">username:</label>
        <input type="text" id="username" value={username} onChange={handleUsernameChange}/>

        <label htmlFor="password">password:</label>
        <input type="password" id="password"value={password} onChange={handlePasswordChange}/>

        <button id='loginButton' type="submit">Login</button>
    </form>
  )
}

export default LoginForm
