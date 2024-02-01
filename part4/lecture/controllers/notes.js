const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')
const middleware = require('../utils/middleware')

notesRouter.get('/', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

notesRouter.get('/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

notesRouter.post('/',  middleware.userExtractor,async (request, response) => {
  const body = request.body
  if (!request.user) response.status(401).json({ error: 'token missing or invalid' }).end()
  const user = await User.findById(request.user.id)
  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
    user: user.id
  })
  user.notes = user.notes.concat(note._id)
  const savedNote = await note.save()
  await user.save()
  response.json(savedNote)


})

notesRouter.delete('/:id',middleware.userExtractor, async (request, response) => {
  if (!request.user) response.status(401).json({ error: 'token missing or invalid' }).end()
  const user = await User.findById(request.user.id)
  if(user.notes.includes(request.params.id) ){
    await Note.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }else{
    response.status(403).end()
  }
})

notesRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

module.exports = notesRouter