import { useDispatch } from 'react-redux'
import { destroyBlog, likeBlog } from '../reducers/blogsReducer'
import { sendNotification } from '../reducers/notificationReducer'
import blogsService from '../services/blogs'
import { useNavigate } from 'react-router-dom'
import CommentsSection from './CommentsSection'

const BlogDetails = ({ blog, loggedUser }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  console.log(blog)
  if (!blog) return null

  const { title, author, likes, url, user } = blog

  const updateBlog = async (blog) => {
    try {
      dispatch(likeBlog(blog))
    } catch (error) {
      console.error('error creating new blog', error)
      dispatch(
        sendNotification(
          {
            message: `❌ Error updating blog, error: ${error}`,
            status: 'error'
          },
          3
        )
      )
    }
  }
  const increaseLikes = () => {
    console.log('increase likes')
    updateBlog(blog)
  }

  const deleteBlog = async (blog) => {
    blogsService.setToken(loggedUser.token)
    try {
      dispatch(destroyBlog(blog))
      dispatch(
        sendNotification(
          {
            message: `🗑️ Blog deleted succesfully: ${title} by ${author}`,
            status: 'success'
          },
          3
        )
      )
      navigate('/')
    } catch (error) {
      console.error('error deleting blog', error)
      dispatch(
        sendNotification(
          {
            message: `Error deleting blog, error: ${error}`,
            status: 'error'
          },
          3
        )
      )
    }
  }
  const handleDelete = () => {
    window.confirm(`Do you want to delete blog: ${title} by ${author}?`) &&
      deleteBlog(blog)
  }

  return (
    <div className="h-dvh w-full">
      <h2 className="text-2xl">Blog details</h2>
      <h3 className="text-xl">
        {title} by {author}
      </h3>
      <p className="blog-likes">
        {likes} likes{' '}
        <button
          className="btn btn-primary-outlined text-sm px-4 py-0 rounded-full"
          onClick={increaseLikes}
        >
          like
        </button>{' '}
      </p>
      <a href={url} target="_blank" rel="noreferrer">
        {url}
      </a>
      <p>
        {user.name} | <i>@{user.username}</i>{' '}
      </p>
      {user.username === loggedUser.username && (
        <button className="btn btn-primary-outlined" onClick={handleDelete}>
          delete
        </button>
      )}
      <CommentsSection blog={blog} />
    </div>
  )
}
export default BlogDetails
