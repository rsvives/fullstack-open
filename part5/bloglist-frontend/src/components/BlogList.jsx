import Blog from './Blog'

const BlogList = ({ blogs }) => (
  <>
    <h2>Blogs</h2>
    {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
    )}
  </>
)

export default BlogList
