// import { useState } from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog, onUpdate, onDelete, loggedUser }) => {
  return (
    <div className="flex justify-between hover:bg-gray-100 p-2">
      <h4>
        <Link to={`/blogs/${blog.id}`} className="text-lg ">
          {blog.title} | {blog.author}
        </Link>
      </h4>
      <span className="">{blog.likes} ❤️</span>
    </div>
  )
}

export default Blog
