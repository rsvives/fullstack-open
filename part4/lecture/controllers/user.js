const User = require('../models/user')
const userRouter = require('express').Router()
const bcrypt = require('bcrypt')

userRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('notes', { content: 1, date: 1 })
  response.json(users)
})
userRouter.post('/', async (request, response) => {
  const body = request.body
  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash: await bcrypt.hash(body.password, 10),
  })
  const savedUser = await user.save()
  response.json(savedUser)
})

userRouter.delete('/:id', async (request, response) => {
  await User.findByIdAndRemove(request.params.id)
  response.status(204).end()
})


module.exports = userRouter