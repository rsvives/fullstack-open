const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// get all
blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

// new
blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  if (!blog.title || !blog.url) { return response.status(400).end() }

  await blog.save()
  response.status(201).json(blog)
})

// delete
blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  await Blog.findByIdAndDelete(id)
  response.status(204).end()
})

// update
blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const query = request.body
  const updatedBlog = await Blog.findByIdAndUpdate(id, { ...query })
  response.status(200).json(updatedBlog)
})

module.exports = blogsRouter
