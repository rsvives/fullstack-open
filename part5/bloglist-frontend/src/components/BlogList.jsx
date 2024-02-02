import Blog from './Blog'
import NewBlogForm from './NewBlogForm'

const BlogList = ({ blogs, onCreateNew }) => {
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
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  </>
  )
}

export default BlogList
