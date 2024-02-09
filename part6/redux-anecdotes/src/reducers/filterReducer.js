const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'UPDATE':{
      const search = action.payload
      // console.log('filter', search)
      return search
    }

    default:{
      return state
    }
  }
}

export const updateFilter = (search) => {
  return {
    type: 'UPDATE',
    payload: search
  }
}

export default filterReducer
