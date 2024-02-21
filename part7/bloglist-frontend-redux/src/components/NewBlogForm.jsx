import { useRef, useState } from 'react'
import Togglable from './Togglable'
import { sendNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogsReducer'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'

const NewBlogForm = ({ loggedUser }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })
  const dispatch = useDispatch()
  const handleNewBlogChange = (event) => {
    const { name, value } = event.target
    // console.log('handleNewBlogChange', name, value)
    setNewBlog({ ...newBlog, [name]: value, likes: 0 }) // 👈 this is fire
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    newBlogFormRef.current.toggleExpanded()
    console.log(newBlog)
    createNewBlog(newBlog)
    setNewBlog({ title: '', author: '', url: '' })
  }

  const createNewBlog = async (blogObject) => {
    blogService.setToken(loggedUser.token)
    try {
      blogObject.user = loggedUser
      await dispatch(createBlog(blogObject))
      await dispatch(
        sendNotification({ message: '✅ New blog added', status: 'success' }, 3)
      )
    } catch (error) {
      console.error('error creating new blog', error)
      await dispatch(
        sendNotification(
          {
            message: `❌ Error creating new blog, error: ${error}`,
            status: 'error'
          },
          3
        )
      )
    }
  }

  const newBlogFormRef = useRef()
  return (
    <div className="flex flex-col gap-2 pt-2 w-64 sticky top-40">
      <Togglable ref={newBlogFormRef} buttonLabel="New Blog">
        <h2 className="text-lg"> Create New</h2>
        <form
          id="newBlogForm"
          onSubmit={handleSubmit}
          className="flex flex-col gap-2"
        >
          <label htmlFor="blogTitle">Title:</label>
          <input
            className="input"
            type="text"
            id="blogTitle"
            value={newBlog.title}
            name="title"
            onChange={handleNewBlogChange}
            required
          />

          <label htmlFor="blogAuthor">Author:</label>
          <input
            className="input"
            type="text"
            id="blogAuthor"
            value={newBlog.author}
            name="author"
            onChange={handleNewBlogChange}
            required
          />

          <label htmlFor="blogUrl">Url:</label>
          <input
            className="input"
            type="text"
            id="blogUrl"
            value={newBlog.url}
            name="url"
            onChange={handleNewBlogChange}
            required
          />

          <button className="btn btn-primary" type="submit">
            Create
          </button>
        </form>
      </Togglable>
    </div>
  )
}

export default NewBlogForm
