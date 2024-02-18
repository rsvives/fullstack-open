import PropTypes from 'prop-types'
import Blog from './Blog'
import NewBlogForm from './NewBlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { sendNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogsReducer'
import blogService from '../services/blogs'

const BlogList = ({ onDelete, loggedUser }) => {
  const blogList = {
    maxWidth: 800,
    margin: 'auto'
  }
  const dispatch = useDispatch()

  const blogs = useSelector(({ blogs }) => blogs)
  const sortedBlogs = blogs.toSorted((a, b) => b.likes - a.likes)
  console.log('sorted', sortedBlogs)
  const createNewBlog = async (blogObject) => {
    blogService.setToken(loggedUser.token)
    try {
      blogObject.user = loggedUser
      dispatch(createBlog(blogObject))
      dispatch(
        sendNotification({ message: '✅ New blog added', status: 'success' }, 3)
      )
    } catch (error) {
      console.error('error creating new blog', error)
      dispatch(
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

  return (
    <>
      <NewBlogForm createNewBlog={createNewBlog} />

      <div className="blogList" style={blogList}>
        <h2>Blogs</h2>
        {sortedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            // onUpdate={() => updateBlog(blog)}
            // onDelete={() => deleteBlog(blog)}
            // loggedUser={loggedUser}
          />
        ))}
      </div>
    </>
  )
}
BlogList.propTypes = {
  blogs: PropTypes.array,
  // onUpdate: PropTypes.func.isRequired,
  // onDelete: PropTypes.func.isRequired,
  loggedUser: PropTypes.object.isRequired
}

export default BlogList
