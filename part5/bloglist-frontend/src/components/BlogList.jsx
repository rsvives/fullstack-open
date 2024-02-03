import Blog from './Blog'
import NewBlogForm from './NewBlogForm'
// import blogService from '../services/blogs'

const BlogList = ({ blogs, onCreateNew, onUpdate, onDelete, loggedUser }) => {
  const blogList = {
    maxWidth: 800,
    margin: 'auto'
  }

  // const increaseLikes = async (blog) => {
  //   const updatedBlog = await blogService.updateBlog({ ...blog, likes: likes + 1 })
  //   blogs.find(blog.id) = updatedBlog.likes
  // }

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

export default BlogList
