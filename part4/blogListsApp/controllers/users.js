const User = require('../models/user')
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()

usersRouter.get('/', async (req, res) => {
  const users = await User.find({})
  res.json(users)
})
usersRouter.post('/', async (req, res) => {
  const { name, username, password } = req.body
  const SALT_ROUNDS = 10
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)

  const newUser = new User({ name, username, passwordHash })
  const savedUser = await newUser.save()
  res.status(201).json(savedUser)
})

module.exports = usersRouter
