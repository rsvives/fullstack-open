const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  for (const blog of helper.initialBlogs) {
    const newBlog = new Blog(blog)
    await newBlog.save()
  }
})

describe('getting blogs from db', () => {
  test('notes are returned in JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('notes have id property', async () => {
    const response = await api.get('/api/blogs')
    const ids = response.body.map(r => r.id)
    // expect(ids[0]).toBeDefined() //just checking one
    expect(ids.every((id) => id !== undefined && id !== null)).toBeTruthy() // checking if all are defined
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
