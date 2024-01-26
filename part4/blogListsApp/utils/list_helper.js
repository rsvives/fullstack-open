const dummy = (blogs) => {
  return blogs ? 1 : 0
}

const totalLikes = (list) => {
  return list.reduce((prev, current) => prev + current.likes, 0)
}

module.exports = {
  dummy,
  totalLikes
}
