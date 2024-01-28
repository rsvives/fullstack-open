require('dotenv').config()

const PORT = process.env.PORT || 3003
const MONGODB_URI = process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : process.env.MONGODB_URI_TEST

const SALT_ROUNDS = 10

module.exports = {
  MONGODB_URI,
  PORT,
  SALT_ROUNDS
}
