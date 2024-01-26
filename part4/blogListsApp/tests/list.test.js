const listHelper = require('../utils/list_helper')
const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]
const listWithBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  }
]
test('dummy', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list is empty, equals 0', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has many blogs, equals the sum of all of them', () => {
    const result = listHelper.totalLikes(listWithBlogs)
    expect(result).toBe(24)
  })
})

describe('favorite blog', () => {
  test('of empty list, returns null', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toEqual(null)
  })
  test('of list of blogs, returns the one with more likes', () => {
    const result = listHelper.favoriteBlog(listWithBlogs)
    const expectedResult = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    }
    expect(result).toEqual(expectedResult)
  })
})

describe('author with most blogs', () => {
  test('of list, returns the author with most blogs', () => {
    const result = listHelper.mostBlogs(listWithBlogs)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 2
    })
  })
  test('of list with one author, returns the same author in the right format', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1
    })
  })
  test('of an empty list returns null', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toEqual(null)
  })
})

describe('author with most likes', () => {
  test('of list, returns the author with most likes', () => {
    const result = listHelper.mostLikes(listWithBlogs)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })
  test('of list with one author, returns the same author in the right format', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 5
    })
  })
  test('of empty list, returns null', () => {
    const result = listHelper.mostLikes([])
    expect(result).toEqual(null)
  })
})
