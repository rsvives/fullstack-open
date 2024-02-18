const commentsRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')

// all
commentsRouter.get('/comments', async (req, res) => {
  const comments = await Comment.find({})
  res.json(comments)
})

// by blog
commentsRouter.get('/blogs/:id/comments', async (req, res) => {
  const blogId = req.params.id
  const comments = await Comment.find({ blog: blogId })
  res.json(comments)
})

// new
commentsRouter.post('/blogs/:id/comments', async (req, res) => {
  const blogId = req.params.id
  const { content } = req.body
  console.log(req.body)
  const newComment = new Comment({ content, blog: blogId })
  const blog = await Blog.findById(blogId)
  blog.comments = blog.comments.concat(newComment)

  await blog.save()
  await newComment.save()

  res.status(201).json({ comment: newComment, blog })
})

module.exports = commentsRouter
