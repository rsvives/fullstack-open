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
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const getUserFromLocalStorage = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }
  useEffect(getUserFromLocalStorage, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('login', username, password)
    try {
      const response = await loginService.login({ username, password })

      console.log(response)
      setUser(response)
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(response))
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
  const handleNewBlogChange = (event) => {
    const { name, value } = event.target
    // console.log('handleNewBlogChange', name, value)
    setNewBlog({ ...newBlog, [name]: value })
  }
  const createNewBlog = async (event) => {
    event.preventDefault()
    console.log('create new blog', newBlog)
    blogService.setToken(user.token)
    try {
      const addedBlog = await blogService.createNew(newBlog)
      // console.log(addedBlog)
      setBlogs([...blogs, addedBlog])
    } catch (error) {
      console.error('error creating new blog', error)
    }
  }

  const loginForm = () => (
    <LoginForm submitAction={handleLogin} user={{ username, handleUsernameChange }} pwd={{ password, handlePasswordChange }} />
  )
  const blogList = () => (
    <BlogList blogs={blogs} newBlogProp={{ newBlog, handleNewBlogChange }} onCreateNew={createNewBlog}/>
  )

  const logoutButton = () => {
    const handleLogout = () => {
      window.localStorage.removeItem('loggedBloglistUser')
      setUser(null)
    }
    return <button onClick={handleLogout}>logout</button>
  }

  return (
    <div>
      <h1>Blog List App</h1>
      {user === null ? loginForm() : blogList() }
      {user && logoutButton() }
      <br />
      {JSON.stringify(newBlog)}
    </div>
  )
}

export default App
