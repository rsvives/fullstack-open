import PropTypes from 'prop-types'
import Blog from './Blog'
import NewBlogForm from './NewBlogForm'
// import blogService from '../services/blogs'

const BlogList = ({ blogs, onCreateNew, onUpdate, onDelete, loggedUser }) => {
  const blogList = {
    maxWidth: 800,
    margin: 'auto'
  }

  return (
    <>
    <NewBlogForm createNewBlog={onCreateNew} />

    <div className="blogList" style={blogList}>
    <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} onUpdate={onUpdate} onDelete={onDelete} loggedUser={loggedUser}/>
      )}
    </div>
  </>
  )
}
BlogList.propTypes = {
  blogs: PropTypes.array,
  onCreateNew: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  loggedUser: PropTypes.object.isRequired

}

export default BlogList
