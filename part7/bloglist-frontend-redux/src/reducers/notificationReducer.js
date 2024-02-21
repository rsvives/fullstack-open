import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {},
  reducers: {
    setMessage(state, action) {
      const { message, status } = action.payload
      console.log(message,status);
      return { message, status }
    },
    clearMessage(state, action) {
      return {}
    },
  },
})

export const { setMessage, clearMessage } = notificationSlice.actions

export const sendNotification = (message, time) => {
  return async (dispatch) => {
    await dispatch(setMessage(message))
    console.log('1', message);
    setTimeout(() => dispatch(clearMessage()), time * 1000)
  }
}

export default notificationSlice.reducer
