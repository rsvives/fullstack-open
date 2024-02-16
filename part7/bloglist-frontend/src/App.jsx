import './App.css'
import { useState, useEffect } from 'react'

import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import NotificationToast from './components/NotificationToast'

import loginService from './services/login'
import blogService from './services/blogs'
import { sendNotification } from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [sortedBlogs, setSortedBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: '', status: '' })
  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])
  const sortBlogs = () => {
    const sorted = [...blogs].sort((a, b) => b.likes - a.likes)
    console.log('sorted', sorted)
    setSortedBlogs(sorted)
  }

  useEffect(() => {
    sortBlogs()
  }, [blogs])

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

      // console.log(response)
      setUser(response)
      window.localStorage.setItem(
        'loggedBloglistUser',
        JSON.stringify(response),
      )

      dispatch(
        sendNotification(
          {
            message: `👋 Welcome ${response.name}`,
            status: 'success',
          },
          3,
        ),
      )
    } catch (error) {
      console.error('credentials error', error)
      dispatch(
        sendNotification(
          {
            message: `❌ Error ${error.response.status}: ${error.response.data.error}`,
            status: 'error',
          },
          3,
        ),
      )
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
      dispatch(
        sendNotification(
          { message: '✅ New blog added', status: 'success' },
          3,
        ),
      )
    } catch (error) {
      console.error('error creating new blog', error)
      dispatch(
        sendNotification(
          {
            message: `❌ Error creating new blog, error: ${error}`,
            status: 'error',
          },
          3,
        ),
      )
    }
  }

  const updateBlog = async (blog) => {
    // console.log('updating likes', blog)
    blog.likes = blog.likes + 1
    try {
      await blogService.updateBlog({ ...blog })
      const newBlogs = blogs.map((b) => (b.id === blog.id ? b : b))
      setBlogs(newBlogs)
    } catch (error) {
      console.error('error creating new blog', error)
      dispatch(
        sendNotification(
          {
            message: `❌ Error updating blog, error: ${error}`,
            status: 'error',
          },
          3,
        ),
      )
    }
  }

  const deleteBlog = async (blog) => {
    blogService.setToken(user.token)
    try {
      await blogService.deleteBlog(blog.id)
      const filteredBlogs = blogs.filter((b) => b.id !== blog.id)
      console.log(filteredBlogs)
      setBlogs(filteredBlogs)
      dispatch(
        sendNotification(
          {
            message: `🗑️ Blog deleted succesfully: ${blog.title} by ${blog.author}`,
            status: 'success',
          },
          3,
        ),
      )
    } catch (error) {
      console.error('error deleting blog', error)
      dispatch(
        sendNotification(
          {
            message: `Error deleting blog, error: ${error}`,
            status: 'error',
          },
          3,
        ),
      )
    }
  }

  const loginForm = () => <LoginForm submitAction={handleLogin} />
  const blogList = () => (
    <BlogList
      blogs={sortedBlogs}
      onCreateNew={createNewBlog}
      onUpdate={updateBlog}
      onDelete={deleteBlog}
      loggedUser={user}
    />
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
      <NotificationToast />
      <h1>
        Blog List App{' '}
        <span>
          {user && user.name} {user && logoutButton()}
        </span>
      </h1>

      {user === null ? loginForm() : blogList()}
    </div>
  )
}

export default App
