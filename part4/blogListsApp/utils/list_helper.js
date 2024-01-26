const _ = require('lodash')
const dummy = (blogs) => {
  return blogs ? 1 : 0
}

const totalLikes = (list) => {
  return list.reduce((prev, current) => prev + current.likes, 0)
}

const favoriteBlog = (list) => {
  const mappedList = list.map((el) => {
    const { title, author, likes } = el
    return { title, author, likes }
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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
