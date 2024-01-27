const _ = require('lodash')
const Blog = require('../models/blog')
const dummy = (blogs) => {
  return blogs ? 1 : 0
}

const totalLikes = (list) => {
  return list.reduce((prev, current) => prev + current.likes, 0)
}

const favoriteBlog = (list) => {
  const mappedList = list.map((blog) => {
    const { author, likes, title } = blog
    // return new Blog({ author, likes, title })
    return { author, likes, title }
  })

  const fav = mappedList.length === 0
    ? null
    : mappedList.reduce((max, current) => {
      return current.likes > max.likes ? current : max
    })

  return fav
}

const mostBlogs = (list) => {
  if (list.length === 0) return null

  const groupedList = _.groupBy((list), 'author')

  const mapped = Object.keys(groupedList).map(key => {
    return {
      author: key,
      blogs: groupedList[key].length
    }
  })

  const authorWithMostBlogs = mapped.reduce((max, current) => current.blogs > max.blogs ? current : max)

  // console.log(authorWithMostBlogs)
  return authorWithMostBlogs
}

const mostLikes = (list) => {
  if (list.length === 0) return null
  const groupedList = _.groupBy((list), 'author')

  const mapped = Object.keys(groupedList).map(key => {
    return {
      author: key,
      likes: groupedList[key].reduce((acum, current) => acum + current.likes, 0)
    }
  })

  const authorWithMostLikes = mapped.reduce((max, current) => current.likes > max.likes ? current : max)

  // console.log(authorWithMostLikes)
  return authorWithMostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
