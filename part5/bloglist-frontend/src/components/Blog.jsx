import { useState } from 'react'

// import Togglable from './Togglable'
const Blog = ({ blog, onUpdate, onDelete, loggedUser }) => {
  const [expanded, setExpanded] = useState(false)
  // const [likes, setLikes] = useState(blog.likes)
  const style = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
  const listStyle = {
    gap: 12,
    padding: 12,
    borderBottom: 'solid',
    borderWidth: 1
  }
  const likeButton = {
    borderRadius: 20,
    fontSize: 10,
    padding: '2px 8px',
    cursor: 'pointer'

  }

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }
  const content = () => (
    expanded ? expandedView() : compressedView()
  )

  const increaseLikes = () => {
    onUpdate(blog)
  }
  const handleDelete = () => {
    window.confirm(`Do you want to delete blog: ${blog.title} by ${blog.author}?`) &&
    onDelete(blog)
  }

  const compressedView = (buttonLabel = 'show') => (
    <>
    <div style={style}>
      <h4>{blog.title} | {blog.author}</h4>
      <button onClick={toggleExpanded}>{buttonLabel}</button>
    </div>
    </>
  )

  const expandedView = () => (
    <>
   { compressedView('hide')}
    <p className='blog-likes'>{blog.likes} likes <button className="likeButton" style={likeButton} onClick={increaseLikes}>like</button> </p>
    <a href={blog.url} target='_blank' rel="noreferrer">{blog.url}</a>
    <p>{blog.user.name} | <i>@{blog.user.username}</i> </p>
    {blog.user.username === loggedUser.username && <button onClick={handleDelete}>delete</button>}
    </>
  )
  return (
    <div className='blog' style={listStyle} >
       {content()}
    </div>
  )
}

export default Blog
