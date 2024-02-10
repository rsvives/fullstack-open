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
export default notificationSlice.reducer
