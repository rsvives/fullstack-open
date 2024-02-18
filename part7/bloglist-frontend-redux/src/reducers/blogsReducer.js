import { createSlice } from '@reduxjs/toolkit'
import blogsService from '../services/blogs'
import commentsService from '../services/comments'
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
    updateBlogs(state, action) {
      const newBlog = action.payload
      return state.map((el) => (el.id === newBlog.id ? newBlog : el))
    },
    deleteBlog(state, action) {
      const blogToBeDeleted = action.payload
      //   console.log(state)
      return state.filter((el) => el.id !== blogToBeDeleted.id)
    }
  }
})

export const { setBlogs, addBlog, updateBlogs, deleteBlog } = blogsSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll()
    dispatch(setBlogs(blogs))
  }
}
export const createBlog = (blog) => {
  return async (dispatch) => {
    const { id } = await blogsService.createNew(blog)

    dispatch(addBlog({ ...blog, id }))
  }
}
export const likeBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    console.log(newBlog)
    const updatedBlog = await blogsService.updateBlog(newBlog)
    dispatch(updateBlogs(newBlog))
  }
}
export const destroyBlog = (blog) => {
  return async (dispatch) => {
    await blogsService.deleteBlog(blog.id)
    dispatch(deleteBlog(blog))
  }
}
export const commentOnBlog = ({ content, blog }) => {
  return async (dispatch) => {
    const blogId = blog.id
    console.log('service', content, blog)
    const { comment } = await commentsService.createNewComment({
      content,
      blogId
    })
    const newBlog = {
      ...blog,
      comments: blog.comments.concat(comment)
    }
    dispatch(updateBlogs(newBlog))
  }
}

export default blogsSlice.reducer
