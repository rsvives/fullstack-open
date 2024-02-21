import PropTypes from 'prop-types'
import Blog from './Blog'
// import NewBlogForm from './NewBlogForm'
import { useSelector } from 'react-redux'

const BlogList = ({ loggedUser }) => {
  // const dispatch = useDispatch()

  const blogs = useSelector(({ blogs }) => blogs)
  const sortedBlogs = blogs.toSorted((a, b) => b.likes - a.likes)
  console.log('sorted', sortedBlogs)

  return (
    <>
      <div className="card container">
        <h2 className="text-2xl">Blogs</h2>
        <div role="list" className="flex flex-col divide-y divide-gray-100">
          {sortedBlogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </>
  )
}
BlogList.propTypes = {
  blogs: PropTypes.array,
  loggedUser: PropTypes.object.isRequired
}

export default BlogList
