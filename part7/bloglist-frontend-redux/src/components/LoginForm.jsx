import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logginUser } from '../reducers/loggedUserReducer'
import { useField } from '../hooks'

const LoginForm = (props) => {
  const usernameField = useField('text')
  const passwordField = useField('password')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const credentials = {
      username: usernameField.input.value,
      password: passwordField.input.value
    }
    await dispatch(logginUser(credentials))
    navigate('/')
    usernameField.clear()
    passwordField.clear()
  }

  return (
    <form onSubmit={handleSubmit} className="card flex flex-col m-auto gap-4">
      <label htmlFor="username">username:</label>
      <input className="input" id="username" {...usernameField.input} />

      <label htmlFor="password">password:</label>
      <input id="password" className="input" {...passwordField.input} />

      <button id="loginButton" className="btn btn-primary" type="submit">
        Login
      </button>
    </form>
  )
}

export default LoginForm
