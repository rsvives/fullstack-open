import Blog from './Blog'

const BlogList = ({ blogs, newBlogProp, onCreateNew }) => {
  const { newBlog, handleNewBlogChange } = newBlogProp

  return (
    <>
    <h2> Create New</h2>
      <form onSubmit={onCreateNew}>
        <label htmlFor="blogTitle">Title:</label><br />
        <input type="text" id='blogTitle' value={newBlog.title} name="title" onChange={handleNewBlogChange} required/><br />
        <label htmlFor="blogAuthor">Author:</label><br />
        <input type="text" id='blogAuthor' value={newBlog.author} name="author" onChange={handleNewBlogChange} required/><br />
        <label htmlFor="blogUrl">Url:</label><br />
        <input type="text" id='blogUrl' value={newBlog.url} name="url" onChange={handleNewBlogChange} required/><br /><br />
        <button type="submit"> + New Blog</button>
      </form>
    <h2>Blogs</h2>
    {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
    )}
  </>
  )
}

export default BlogList
