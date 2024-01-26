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
    ? undefined
    : mappedList.reduce((max, current) => {
      return current.likes > max.likes ? current : max
    })

  return fav
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
