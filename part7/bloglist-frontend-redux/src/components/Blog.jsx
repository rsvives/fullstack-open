// import { useState } from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog, onUpdate, onDelete, loggedUser }) => {
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

  return (
    <div className="blog" style={listStyle}>
      <div style={style}>
        <h4>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} | {blog.author}
          </Link>
        </h4>
      </div>
    </div>
  )
}

export default Blog
