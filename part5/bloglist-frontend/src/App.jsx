import './App.css'
import { useState, useEffect } from 'react'

import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import NotificationToast from './components/NotificationToast'

import loginService from './services/login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  // const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })
  const [notification, setNotification] = useState({ message: '', status: '' })

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

  const handleLogin = async (username, password) => {
    console.log('login', username, password)
    try {
      const response = await loginService.login(username, password)

      console.log(response)
      setUser(response)
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(response))

      setNotification({ message: `👋 Welcome ${response.name}`, status: 'success' })
    } catch (error) {
      console.error('credentials error', error)
      setNotification({ message: `❌ Wrong username or password. Details: ${error}`, status: 'error' })
    } finally {
      setTimeout(() => setNotification({ message: '', status: '' }), 5000)
    }
  }

  const createNewBlog = async (blogObject) => {
    blogService.setToken(user.token)
    try {
      // blogObject.user = user
      const addedBlog = await blogService.createNew(blogObject)
      addedBlog.user = { username: user.username, name: user.name }
      console.log('added blog', addedBlog)
      setBlogs([...blogs, addedBlog])
      setNotification({ message: '✅ New blog added', status: 'success' })
    } catch (error) {
      console.error('error creating new blog', error)
      setNotification({ message: `Error creating new blog, error: ${error}`, status: 'error' })
    } finally {
      setTimeout(() => setNotification({ message: '', status: '' }), 5000)
    }
  }

  const loginForm = () => (
    <LoginForm submitAction={handleLogin} />
  )
  const blogList = () => (
    <BlogList blogs={blogs} onCreateNew={createNewBlog}/>
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
      {notification.message !== '' && <NotificationToast message={notification.message} status={notification.status}/>}
      <h1>Blog List App {user && logoutButton() }</h1>
      {user === null ? loginForm() : blogList() }

    </div>
  )
}

export default App
