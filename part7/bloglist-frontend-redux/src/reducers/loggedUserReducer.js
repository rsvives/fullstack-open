import { createSlice } from '@reduxjs/toolkit'
import login from '../services/login'
import { sendNotification } from './notificationReducer'

const loggedUserSlice = createSlice({
  name: 'loggedUser',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  },
})

export const { setUser } = loggedUserSlice.actions

export const logginUser = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await login.login(credentials)
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      dispatch(setUser(user))
      dispatch(
        sendNotification(
          {
            message: `👋 Welcome ${user.name}`,
            status: 'success',
          },
          3,
        ),
      )
    } catch (e) {
      dispatch(
        sendNotification(
          {
            message: `❌ Error ${e.response.status}: ${e.response.data.error}`,
            status: 'error',
          },
          3,
        ),
      )
    }
  }
}
export const loggoutUser = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedBloglistUser')
    dispatch(setUser(null))
  }
}

export default loggedUserSlice.reducer
