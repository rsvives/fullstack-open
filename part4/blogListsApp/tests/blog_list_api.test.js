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

describe('GET all blogs from db', () => {
  test('notes are returned in JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('notes have id property', async () => {
    const response = await api.get('/api/blogs')
    const ids = response.body.map(r => r.id)
    // expect(ids[0]).toBeDefined() // just checking one
    expect(ids.every((id) => id !== undefined && id !== null)).toBeTruthy() // checking if all are defined
  })
})

describe('POST new blog', () => {
  test('a valid blog can be posted', async () => {
    await api
      .post('/api/blogs')
      .send(helper.newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const savedBlogs = await helper.dbBlogs()
    expect(savedBlogs).toHaveLength(helper.initialBlogs.length + 1)

    const titles = savedBlogs.map(blog => blog.title)
    expect(titles).toContain(helper.newBlog.title)
  })

  test('likes property defaults to 0 if undefined', async () => {
    const newBlog = helper.newBlog
    delete newBlog.likes

    await api.post('/api/blogs')
      .send(newBlog)

    const savedBlogs = await helper.dbBlogs()
    const lastBlog = savedBlogs.pop()

    expect(lastBlog.likes).toBe(0)
  })
  test('title must be defined', async () => {
    const newBlog = helper.newBlog
    delete newBlog.title

    await api.post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
  test('url must be defined', async () => {
    const newBlog = helper.newBlog
    delete newBlog.url

    await api.post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})

describe('DELETE a blog', () => {
  test.todo('succeeds with 204 code if deleted OK')
  test.todo('fails with 404 if wrong id')
})

describe('UPDATE a blog', () => {
  test.todo('a valid blog can be posted')
  test.todo('likes property defaults to 0 if undefined')
})

afterAll(async () => {
  await mongoose.connection.close()
})
