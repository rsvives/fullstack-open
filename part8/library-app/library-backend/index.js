const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
require('dotenv').config()
const Author = require('./models/Author')
const Book = require('./models/Book')
const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


const typeDefs = `
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Mutation {
    addBook(
        title: String!
        author: String!
				published: Int!
				genres: [String!]!
    ): Book
		editAuthor(
			name: String!
			setBornTo: Int!
		): Author
  }

`

const resolvers = {
  Query: {
    bookCount: async() => Book.find({}).countDocuments(),
    authorCount:async()=>Author.find({}).countDocuments(),
    allBooks: async (root,args)=>{

        const author = args.author? args.author: {$exists:true}
        const authorId = await Author.find({name:author}).select('id').exec()
        
        const genre = args.genre? {$in:[args.genre]}:{$exists:true}
        
        return await Book.find({$and:[{'author':{$in:authorId}},{genres:genre}]}).populate('author')
    },
    allAuthors: async()=>Author.find({})
  },
  Author: {
    bookCount: async (root,args)=>{
       const booksWritten = Book.find({author:root._id}).countDocuments()
       return booksWritten
    }
	},
	Mutation :{
    addBook:async (root,args)=>{
        const author = await Author.findOne({name:args.author})?? await new Author({name:args.author}).save()
        const book = {...args, author:author._id}
        const savedBook = await new Book({...book}).save()
      
        return savedBook
    },
		editAuthor: async (root, args)=>{
			const updatedAuthor = await Author.findOneAndUpdate({name:args.name},{born:args.setBornTo})
			console.log(updatedAuthor)
			return updatedAuthor
		}
	}
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})