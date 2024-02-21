import BlogList from './BlogList'
import NewBlogForm from './NewBlogForm'

const BlogsPage = ({ loggedUser }) => {
  return (
    <>
      <NewBlogForm loggedUser={loggedUser} />
      <BlogList loggedUser={loggedUser} />
    </>
  )
}
export default BlogsPage
