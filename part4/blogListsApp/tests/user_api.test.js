const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const config = require('../utils/config')
const app = require('../app')
const supertest = require('supertest')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  const newUser = new User(helper.firstUser)
  newUser.passwordHash = await bcrypt.hash(helper.firstUser.password, config.SALT_ROUNDS)
  await newUser.save()
})

describe('GET all users from db', () => {
  test('users are returned in JSON', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('users have id', async () => {
    const response = await api.get('/api/users')
    const ids = response.body.map(r => r.id)
    // expect(ids[0]).toBeDefined() // just checking one
    expect(ids.every((id) => id !== undefined && id !== null)).toBeTruthy() // checking if all are defined
  })
})
describe('POST new users', () => {
  test('a valid user can be posted', async () => {
    const newUser = {
      name: 'Mr Super User',
      username: 'Superuser',
      password: 'superpass123'
    }

    const response = await api
      .post('/api/users').send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const savedUser = response.body
    const dbUsers = await helper.dbUsers()
    expect(dbUsers.map(u => u.username)).toContain(savedUser.username)
  })
  test('username is required with min length of 3', async () => {
    const badUser = {
      name: 'Mr badUser',
      username: 'a',
      password: 'pass123'
    }
    await api.post('/api/users').send(badUser).expect(400)
  })
  test('username must be unique', async () => {
    const repeatedUser = helper.firstUser
    // console.log(repeatedUser)

    await api.post('/api/users').send(repeatedUser).expect(400)
  })
  test('password is required with min length of 3', async () => {
    const badUser = {
      name: 'Mr badUser',
      username: 'BadUser',
      password: 'p'
    }
    await api.post('/api/users').send(badUser).expect(400)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
