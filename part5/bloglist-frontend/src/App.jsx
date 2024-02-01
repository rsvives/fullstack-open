import { useState, useEffect } from 'react'

import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'

import loginService from './services/login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('login', username, password)
    try {
      const response = await loginService.login({ username, password })

      console.log(response)
      setUser(response)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.error('credentials error', error)
    }
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const loginForm = () => (
    <LoginForm submitAction={handleLogin} user={{ username, handleUsernameChange }} pwd={{ password, handlePasswordChange }} />
  )
  const blogList = () => (
    <BlogList blogs={blogs}/>
  )

  return (
    <div>
      <h1>Blog List App</h1>
      {user === null ? loginForm() : blogList() }
    </div>
  )
}

export default App
