import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setMessage (state, action) {
      const message = action.payload
      // console.log('message', message)
      return message
    },
    clearMessage (state, action) {
      // console.log('clearMessage')
      return ''
    }
  }
})

export const { setMessage, clearMessage } = notificationSlice.actions

export const setNotification = (message, time) => {
  return async dispatch => {
    dispatch(setMessage(message))
    setTimeout(() => dispatch(clearMessage()), time * 1000)
  }
}

export default notificationSlice.reducer
