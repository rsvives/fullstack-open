import './App.css'
import { useEffect } from 'react'

import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import NotificationToast from './components/NotificationToast'

import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import { logginUser, setUser } from './reducers/loggedUserReducer'

import { Route, Routes, useMatch } from 'react-router-dom'
import NavMenu from './components/NavMenu'
import UsersPage from './components/UsersPage'
import { initializeUsers } from './reducers/usersReducer'
import UserDetails from './components/UserDetails'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [])

  const getUserFromLocalStorage = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }
  useEffect(getUserFromLocalStorage, [])
  // const { loggedUser, users } = useSelector(
  //   ({ loggedUser, users }) =>{ return (loggedUser,
  //   users)}
  // )
  const loggedUser = useSelector(({ loggedUser }) => loggedUser)
  const users = useSelector(({ users }) => users)

  const handleLogin = async (username, password) => {
    dispatch(logginUser(username, password))
  }
  const match = useMatch('/users/:id')
  const user = match ? users.find((u) => u.id === match.params.id) : null

  console.log(user)
  const loginForm = () => <LoginForm submitAction={handleLogin} />
  const blogList = () => <BlogList loggedUser={loggedUser} />

  return (
    <>
      <NotificationToast />
      <NavMenu title="Blog List App" user={loggedUser} links={null} />
      <Routes>
        <Route path="/users/:id" element={<UserDetails user={user} />} />
        <Route path="/users/" element={<UsersPage />} />
        <Route
          path="/"
          element={loggedUser === null ? loginForm() : blogList()}
        />
      </Routes>
    </>
  )
}

export default App
