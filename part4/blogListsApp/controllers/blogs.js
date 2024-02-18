const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')

// get all
blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 }).populate('comments', { content: 1 }).sort({ likes: -1 })
  res.json(blogs)
})
// get by id
blogsRouter.get('/:id', async (req, res) => {
  const id = req.params.id
  const blog = await Blog.findById(id).populate('comments', { content: 1 })
  res.json(blog)
})

// new
blogsRouter.post('/', userExtractor, async (request, response, next) => {
  const blog = new Blog(request.body)
  if (!blog.title || !blog.url) { return response.status(400).end() }

  const decodedToken = request.decodedToken
  const user = await User.findById(decodedToken.id)
  blog.user = user.id
  const savedBlog = await blog.save()

  user.blogList = user.blogList.concat(savedBlog.id)
  await user.save()

  response.status(201).json(savedBlog)
})

// delete
blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const id = request.params.id

  const user = await User.findById(request.decodedToken.id).populate('blogList')
  if (user.blogList.map(b => b.id).includes(id)) {
    await Blog.findByIdAndDelete(id)
    response.status(204).end()
  } else {
    return response.status(403).json({ error: 'Action forbidden: user is not the owner of the resource' })
  }
})

// update
blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const query = request.body
  const updatedBlog = await Blog.findByIdAndUpdate(id, { ...query }, { new: true })
  response.status(200).json(updatedBlog)
})

// // testing reset db
// blogsRouter.post('/', userExtractor, async (request, response, next) => {

//   if (!blog.title || !blog.url) { return response.status(400).end() }

//   const decodedToken = request.decodedToken
//   const user = await User.findById(decodedToken.id)
//   blog.user = user.id
//   const savedBlog = await blog.save()

//   user.blogList = user.blogList.concat(savedBlog.id)
//   await user.save()

//   response.status(201).json(savedBlog)
// })

module.exports = blogsRouter
