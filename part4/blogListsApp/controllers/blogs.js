const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// get all
blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

// new
blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(error => console.error(error))
})

module.exports = blogsRouter
