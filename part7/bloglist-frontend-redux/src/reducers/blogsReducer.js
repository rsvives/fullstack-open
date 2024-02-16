import { createSlice } from '@reduxjs/toolkit'
import blogsService from '../services/blogs'
const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    addBlog(state, action) {
      const newBlog = action.payload
      state.push(newBlog)
    },
  },
})

export const { setBlogs, addBlog } = blogsSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll()
    dispatch(setBlogs(blogs))
  }
}
export const createBlog = (content) => {
  return async (dispatch) => {
    const savedBlog = await blogsService.createNew(content)
    dispatch(addBlog(savedBlog))
  }
}

export default blogsSlice.reducer
