import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'
import loggedUserReducer from './reducers/loggedUserReducer'
import usersReducer from './reducers/usersReducer'

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    loggedUser: loggedUserReducer,
    users: usersReducer,
  },
})
