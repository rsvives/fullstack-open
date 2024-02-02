const logger = require('./logger')
const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
  const { password, ...bodyWithNoPwd } = request.body

  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', bodyWithNoPwd)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  switch (error.name) {
    case 'CastError':
      return response.status(400).send({ error: 'malformatted id' })
    case 'ValidationError':
      return response.status(400).json({ error: error.message })
    case 'JsonWebTokenError':
      return response.status(401).json({ error: 'invalid token' })
    case 'TokenExpiredError':
      return response.status(401).json({ error: 'token has expired' })
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  const token = (authorization && authorization.startsWith('Bearer ')) ? authorization.replace('Bearer ', '') : null
  request.token = token
  next()
}

const userExtractor = (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (decodedToken.id) {
    request.decodedToken = decodedToken
  }
  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}
