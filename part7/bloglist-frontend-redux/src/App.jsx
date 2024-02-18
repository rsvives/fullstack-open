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
import BlogDetails from './components/BlogDetails'

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

  // const { loggedUser, users } = useSelector( //this doesn't work 🤔
  //   ({ loggedUser, users }) =>{ return (loggedUser,
  //   users)}
  // )
  const loggedUser = useSelector(({ loggedUser }) => loggedUser)
  const users = useSelector(({ users }) => users)
  const blogs = useSelector(({ blogs }) => blogs)

  const handleLogin = async (username, password) => {
    dispatch(logginUser(username, password))
  }
  const userMatch = useMatch('/users/:id')
  const user = userMatch
    ? users.find((u) => u.id === userMatch.params.id)
    : null
  const blogsMatch = useMatch('/blogs/:id')
  const blog = blogsMatch
    ? blogs.find((b) => b.id === blogsMatch.params.id)
    : null

  const loginForm = () => <LoginForm submitAction={handleLogin} />
  const blogList = () => <BlogList loggedUser={loggedUser} />

  return (
    <>
      <NotificationToast />
      <NavMenu title="Blog List App" user={loggedUser} links={null} />
      <Routes>
        <Route
          path="/blogs/:id"
          element={<BlogDetails blog={blog} loggedUser={loggedUser} />}
        />

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
