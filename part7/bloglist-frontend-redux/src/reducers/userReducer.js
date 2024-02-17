import { createSlice } from '@reduxjs/toolkit'
import login from '../services/login'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  },
})

export const { setUser } = userSlice.actions

export const logginUser = (credentials) => {
  return async (dispatch) => {
    console.log('dispatch', credentials)
    const user = await login.login(credentials)
    window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
    dispatch(setUser(user))
  }
}
export const loggoutUser = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedBloglistUser')
    dispatch(setUser(null))
  }
}

export default userSlice.reducer
