const mongoose = require('mongoose')

const supertest = require('supertest')
const app = require('../app')
// const Blog = require('../models/blog')
// const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  return await helper.initializeDB()
})

describe('GET all blogs from db', () => {
  test('blogs are returned in JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('blogs have id property', async () => {
    const response = await api.get('/api/blogs')
    const ids = response.body.map(r => r.id)
    // expect(ids[0]).toBeDefined() // just checking one
    expect(ids.every((id) => id !== undefined && id !== null)).toBeTruthy() // checking if all are defined
  })
  test('a blog belongs to a user', async () => {
    const response = await api.get('/api/blogs')

    const users = await helper.dbUsers()
    // console.log(users)
    const firstUser = users[0]

    expect(response.body[0].user.name).toBe(firstUser.name)
  })
})

describe('POST new blog', () => {
  test('a valid blog can be posted', async () => {
    const newBlog = helper.newBlog
    const users = await helper.dbUsers()
    const firstUser = users[0]
    newBlog.user = firstUser.id

    await api
      .post('/api/blogs')
      .send(newBlog)
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
  test('succeeds with 204 code if deleted OK', async () => {
    const blogs = await helper.dbBlogs()
    const lastBlog = blogs.pop()
    await api.delete(`/api/blogs/${lastBlog.id}`)
      .expect(204)
  })
  test('fails with 400 if wrong id', async () => {
    await api.delete('/api/blogs/123').expect(400)
  })
})

describe('UPDATE a blog', () => {
  test('succeeds with 200 code if OK', async () => {
    const blogs = await helper.dbBlogs()
    const lastBlog = blogs.pop()
    lastBlog.title = 'new title'

    await api.put(`/api/blogs/${lastBlog.id}`)
      .send(lastBlog)
      .expect(200)

    const updatedBlogs = await helper.dbBlogs()
    const updatedLastBlog = updatedBlogs.pop()
    expect(updatedLastBlog.title).toBe(lastBlog.title)
  })
  test('fails with 400 if wrong id', async () => {
    await api.put('/api/blogs/123').expect(400)
  })
  test('only update the correct fields', async () => {
    const blogs = await helper.dbBlogs()
    const lastBlog = blogs.pop()
    lastBlog.wrongField = 'this is very wrong'

    const updatedBlog = await api.put(`/api/blogs/${lastBlog.id}`).send(lastBlog)
    expect(updatedBlog.wrongField).toBeUndefined()
  })
})

// afterEach(async () => {
// await User.collection.drop() // this solves an rare error with duplicate keys of users...
// await Blog.collection.drop() // this solves an rare error with duplicate keys of users...
// })

afterAll(async () => {
  await mongoose.connection.close()
})
