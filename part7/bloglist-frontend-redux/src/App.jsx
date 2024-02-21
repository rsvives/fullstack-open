// import './App.css'
import { useEffect } from 'react'

import LoginForm from './components/LoginForm'

import NotificationToast from './components/NotificationToast'

import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import { setUser } from './reducers/loggedUserReducer'

import { Navigate, Route, Routes, useMatch } from 'react-router-dom'
import NavMenu from './components/NavMenu'
import UsersPage from './components/UsersPage'
import { initializeUsers } from './reducers/usersReducer'
import UserDetails from './components/UserDetails'
import BlogDetails from './components/BlogDetails'
import BlogsPage from './components/BlogsPage'
// import { setMessage } from './reducers/notificationReducer'

const App = () => {
  const dispatch = useDispatch()

  const initializeData = async () => {
    await dispatch(initializeBlogs())
    await dispatch(initializeUsers())
  }
  useEffect(() => {
    initializeData()
    // dispatch(setMessage({ message: 'this is a test', status: 'error' }))
  }, [])

  const getUserFromLocalStorage = async () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      await dispatch(setUser(user))
    }
  }
  useEffect(() => {
    getUserFromLocalStorage()
  }, [])

  // const { loggedUser, users } = useSelector( //this doesn't work 🤔
  //   ({ loggedUser, users }) =>{ return (loggedUser,
  //   users)}
  // )

  const loggedUser = useSelector(({ loggedUser }) => loggedUser)
  const users = useSelector(({ users }) => users)
  const blogs = useSelector(({ blogs }) => blogs)

  const userMatch = useMatch('/users/:id')
  const user = userMatch
    ? users.find((u) => u.id === userMatch.params.id)
    : null
  const blogsMatch = useMatch('/blogs/:id')
  const blog = blogsMatch
    ? blogs.find((b) => b.id === blogsMatch.params.id)
    : null

  console.log(loggedUser)

  const links = [
    { path: '/', text: 'blogs' },
    { path: '/users', text: 'users' }
  ]

  return (
    <>
      <NotificationToast />
      <NavMenu title="Blog List App" user={loggedUser} links={links} />
      <main className=" p-4 flex gap-4 minh-dvh relative grow">
        <Routes>
          <Route
            path="/blogs/:id"
            element={
              loggedUser ? (
                <BlogDetails blog={blog} loggedUser={loggedUser} />
              ) : (
                <Navigate replace to={'/login'} />
              )
            }
          />

          <Route
            path="/users/:id"
            element={
              loggedUser ? (
                <UserDetails user={user} />
              ) : (
                <Navigate replace to={'/login'} />
              )
            }
          />
          <Route
            path="/users/"
            element={
              loggedUser ? <UsersPage /> : <Navigate replace to={'/login'} />
            }
          />
          <Route
            path="/"
            element={
              loggedUser ? (
                <BlogsPage loggedUser={loggedUser} />
              ) : (
                <Navigate replace to={'/login'} />
              )
            }
          />
          <Route
            path="/login"
            element={
              !loggedUser ? <LoginForm /> : <Navigate replace to={'/'} />
            }
          />
        </Routes>
      </main>
    </>
  )
}

export default App
