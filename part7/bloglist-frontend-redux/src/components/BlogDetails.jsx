import { useDispatch } from 'react-redux'
import { destroyBlog, likeBlog } from '../reducers/blogsReducer'
import { sendNotification } from '../reducers/notificationReducer'
import blogsService from '../services/blogs'
import { useNavigate } from 'react-router-dom'

const BlogDetails = ({ blog, loggedUser }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  console.log(blog)
  if (!blog) return null

  const likeButtonStyle = {
    borderRadius: 20,
    fontSize: 10,
    padding: '2px 8px',
    cursor: 'pointer'
  }

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
    <>
      <h2>
        {title} by {author}
      </h2>
      <p className="blog-likes">
        {likes} likes{' '}
        <button
          className="likeButton"
          style={likeButtonStyle}
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
        <button onClick={handleDelete}>delete</button>
      )}
      <h4>Comments:</h4>
      <ul>
        {blog.comments.length === 0 ? (
          <p>no comments yet...</p>
        ) : (
          blog.comments.map((c) => <li key={c.id}>{c.content}</li>)
        )}
      </ul>
    </>
  )
}
export default BlogDetails
