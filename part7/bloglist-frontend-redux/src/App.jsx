import './App.css'
import { useState, useEffect } from 'react'

import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import NotificationToast from './components/NotificationToast'

import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import userReducer, {
  logginUser,
  loggoutUser,
  setUser,
} from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  const user = useSelector(({ user }) => user)

  const getUserFromLocalStorage = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }
  useEffect(getUserFromLocalStorage, [])

  const handleLogin = async (username, password) => {
    dispatch(logginUser(username, password))
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
        Blog List App
        <span>
          {user && user.name} {user && logoutButton()}
        </span>
      </h1>

      {user === null ? loginForm() : blogList()}
    </div>
  )
}

export default App
