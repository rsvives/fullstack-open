const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

// get all
blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.json(blogs)
})
// get by id
blogsRouter.get('/:id', async (req, res) => {
  const id = req.params.id
  const blog = await Blog.findById(id)
  res.json(blog)
})

// new
blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  if (!blog.title || !blog.url) { return response.status(400).end() }

  const users = await User.find({})
  const firstUser = new User(users[0])
  // console.log(firstUser.id)

  blog.user = firstUser.id

  const savedBlog = await blog.save()

  firstUser.blogList = firstUser.blogList.concat(savedBlog.id)
  await firstUser.save()

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
