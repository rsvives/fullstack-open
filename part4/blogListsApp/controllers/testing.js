const testingRouter = require('express').Router()
const bcrypt = require('bcrypt')
const config = require('../utils/config')
const User = require('../models/user')
const Blog = require('../models/blog')
const { initialBlogs, initialUsers } = require('../tests/test_helper')

testingRouter.post('/reset', async (req, res) => {
  if (process.env.NODE_ENV !== 'test') return res.status(401).json({ message: 'unauthorized' }).end()

  const { name, username, password } = req.body
  const passwordHash = await bcrypt.hash(password, config.SALT_ROUNDS)
  await User.deleteMany({})
  await Blog.deleteMany({})

  const newUser = new User({ name, username, passwordHash })
  await User.insertMany(initialUsers)
  await newUser.save()
  const allUsers = await User.find({})
  console.log(allUsers)

  const savedBlogs = await Blog.insertMany(initialBlogs)

  // res.status(201).json({ message: 'db reseted', users: allUsers })
  res.status(201).json({ message: 'db reseted', newUsers: allUsers, newBlogs: savedBlogs })
})

module.exports = testingRouter
