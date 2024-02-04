import { useRef, useState } from 'react'
import Togglable from './Togglable'
// import blogService from './services/blogs'

const NewBlogForm = ({ createNewBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const handleNewBlogChange = (event) => {
    const { name, value } = event.target
    // console.log('handleNewBlogChange', name, value)
    setNewBlog({ ...newBlog, [name]: value })// 👈 this is fire
  }
  const addNewBlog = (event) => {
    event.preventDefault()
    newBlogFormRef.current.toggleExpanded()
    // console.log('create new blog', newBlog)
    createNewBlog(newBlog)
    setNewBlog({ title: '', author: '', url: '' })
  }

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 8
  }
  const togglable = {
    border: 'solid',
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: 12,
    gap: 8,
    maxWidth: 400,
    borderRadius: 4,
    margin: 'auto'

  }

  const newBlogFormRef = useRef()
  return (
    <div>
    <Togglable ref={newBlogFormRef} style={togglable} buttonLabel='New Blog' >
    <h2 > Create New</h2>
    <form id='newBlogForm' style={formStyle} onSubmit={addNewBlog}>
        <label htmlFor="blogTitle">Title:</label>
        <input type="text" id='blogTitle' value={newBlog.title} name="title" onChange={handleNewBlogChange} required/>

        <label htmlFor="blogAuthor">Author:</label>
        <input type="text" id='blogAuthor' value={newBlog.author} name="author" onChange={handleNewBlogChange} required/>

        <label htmlFor="blogUrl">Url:</label>
        <input type="text" id='blogUrl' value={newBlog.url} name="url" onChange={handleNewBlogChange} required/>

        <button type="submit">Create</button>
    </form>
    </Togglable>
    </div>
  )
}

export default NewBlogForm
