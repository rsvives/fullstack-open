import './App.css'
import { useState, useEffect } from 'react'

import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import NotificationToast from './components/NotificationToast'

import loginService from './services/login'
import blogService from './services/blogs'
import { sendNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import userReducer, {
  logginUser,
  loggoutUser,
  setUser,
} from './reducers/userReducer'

const App = () => {
  // const [blogs, setBlogs] = useState([])
  // const [sortedBlogs, setSortedBlogs] = useState([])
  // const [user, setUser] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])
  const user = useSelector(({ user }) => user)

  // const sortBlogs = () => {
  //   const sorted = [...blogs].sort((a, b) => b.likes - a.likes)
  //   console.log('sorted', sorted)
  //   setSortedBlogs(sorted)
  // }

  // useEffect(() => {
  //   sortBlogs()
  // }, [blogs])

  const getUserFromLocalStorage = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }
  useEffect(getUserFromLocalStorage, [])

  const handleLogin = async (username, password) => {
    console.log('login', username, password)
    try {
      // const response = await loginService.login(username, password)

      // console.log(response)
      // setUser(response)
      dispatch(logginUser(username, password))
      // window.localStorage.setItem(
      //   'loggedBloglistUser',
      //   JSON.stringify(response),
      // )

      // dispatch(
      //   sendNotification(
      //     {
      //       message: `👋 Welcome ${user.name}`,
      //       status: 'success',
      //     },
      //     3,
      //   ),
      // )
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

  const loginForm = () => <LoginForm submitAction={handleLogin} />
  const blogList = () => <BlogList loggedUser={user} />

  const logoutButton = () => {
    const handleLogout = () => {
      dispatch(loggoutUser())
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
