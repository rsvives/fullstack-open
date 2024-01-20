const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

morgan.token('body', function getBody (req) {
  // console.log("req", req.method);
  return JSON.stringify(req.body)
})
app.use(morgan('tiny'))

app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :body',
    {
      skip (req, res) {
        return req.method !== 'POST'
      }
    }
  )
)

// index
app.get('/', (req, res) => {
  res.send(
    '<h1>Phonebook app</h1>'
  )
})

// all persons
app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then(persons => {
      res.status(200).json(persons)
    }).catch(error => next(error))
})

// find person by id
app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findOne({ _id: id })
    .then(person => {
      if (person) {
        res.status(200).json(person)
      } else {
        res.status(404).end()
      }
    }).catch((error) => next(error))
})

// delete person
app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id

  Person.findByIdAndDelete(id)
    .then((person) => {
      if (person) {
        res.status(204).end()
      } else {
        throw new Error('deleting error: person not found')
      }
    }).catch((error) => {
      next(error)
    })
})

// new person
app.post('/api/persons', (req, res, next) => {
  // if (!req.body.name || !req.body.number) {
  // throw new Error("content missing")
  // } else {
  Person.find({ name: req.body.name })
    .then((result) => {
      // console.log(result)
      if (!result.length) {
        const person = new Person({ ...req.body })
        person.save().then((savedPerson) => {
          // throw new Error()
          res.status(201).json({ message: `${savedPerson.name} was added`, person: savedPerson })
        })
          .catch(error => next(error))
      } else {
        throw new Error('name must be unique')
      }
    })
    .catch((error) => next(error))

  // }
})

// update
app.put('/api/persons/:id', (req, res, next) => {
  console.log('put method')
  const id = req.params.id
  Person.findByIdAndUpdate(id, { ...req.body }, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(error => next(error))
})

// info
app.get('/info', (req, res) => {
  Person.find({}).then(persons => {
    res.send(
      `<p>Phonebook has info for ${persons.length} people</p>
      <p>${Date()}</p>`
    )
  })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  switch (error.name) {
    case 'CastError':
      return response.status(400).send({ error: 'malformatted id' })
    case 'ValidationError':
      return response.status(400).send({ error: error.message })
  }

  switch (error.message) {
    case 'content missing':
      return response.status(400).send({ error: error.message })
    case 'name must be unique':
      return response.status(409).send({ error: error.message })
    case 'error saving new person':
      return response.status(400).send({ error: error.message })
    case 'deleting error: person not found':
      return response.status(404).send({ error: error.message })
    default:
      next(error)
  }
}

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
