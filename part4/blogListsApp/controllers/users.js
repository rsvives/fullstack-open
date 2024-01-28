const User = require('../models/user')
const config = require('../utils/config')
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogList', { user: 0, likes: 0 })
  res.json(users)
})
usersRouter.post('/', async (req, res) => {
  const { name, username, password } = req.body

  if (!username || !password || password.length < 3) res.status(400).json({ error: 'username and password are required' }).end()

  const passwordHash = await bcrypt.hash(password, config.SALT_ROUNDS)

  const newUser = new User({ name, username, passwordHash })
  const savedUser = await newUser.save()
  res.status(201).json(savedUser)
})

module.exports = usersRouter
