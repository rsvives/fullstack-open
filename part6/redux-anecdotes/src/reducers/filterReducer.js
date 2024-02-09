import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    updateFilter (state, action) {
      const search = action.payload

      return search
    }
  }
})

export const { updateFilter } = filterSlice.actions
export default filterSlice.reducer
