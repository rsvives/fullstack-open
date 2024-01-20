const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// get all
blogsRouter.get('/', (req, res) => {
  return Blog.find({}).then((blogs) => res.json(blogs))
    .catch(error => console.error(error))
})

// new
blogsRouter.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(error => console.error(error))
})

module.exports = blogsRouter
