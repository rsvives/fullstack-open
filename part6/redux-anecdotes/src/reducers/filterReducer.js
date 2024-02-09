import { createSlice } from '@reduxjs/toolkit'

// const filterReducer = (state = '', action) => {
//   switch (action.type) {
//     case 'UPDATE':{
//       const search = action.payload
//       // console.log('filter', search)
//       return search
//     }

//     default:{
//       return state
//     }
//   }
// }

// export const updateFilter = (search) => {
//   return {
//     type: 'UPDATE',
//     payload: search
//   }
// }

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    updateFilter (state, action) {
      const search = action.payload
      // console.log(search)
      return search
    }
  }
})

export const { updateFilter } = filterSlice.actions
export default filterSlice.reducer
