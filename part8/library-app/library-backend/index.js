const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
// const { v1: uuid } = require('uuid')
require('dotenv').config()
const jwt = require('jsonwebtoken')

const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')
const userController = require('./controllers/userController')

const mongoose = require('mongoose')
const { GraphQLError } = require('graphql')

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
    allUsers: [User!]!
    me: User
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

  type User{
    username: String!
    favoriteGenre: String!
  }
  
  type Token{
    value:String!
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

    createUser(
      username: String!
      favoriteGenre: String!
    ):User
    
    login(
      username: String!
      password: String!
    ):Token
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
    allAuthors: async()=>Author.find({}),
    // allUsers: async()=>User.find({})
    me: async(root,args,context)=>{
      return context.currentUser
    }
  },
  Author: {
    bookCount: async (root,args)=>{
       const booksWritten = Book.find({author:root._id}).countDocuments()
       return booksWritten
    }
	},
	Mutation :{
    addBook:async (root,args,context)=>{
        const currentUser = context.currentUser

        if(!currentUser){
          throw new GraphQLError('not authenticated',{
            extensions:{
              code: 'BAD_USER_INPUT',
            }
          })
        }

        const author = await Author.findOne({name:args.author})?? await new Author({name:args.author})
        try{
          await author.save()
        }
        catch(error){
          throw new GraphQLError('Error adding book: incorrect author',{
            extensions:{
              code: 'BAD_USER_INPUT',
              invalidArgs: {author},
              error
            }
          })
        }

        const book = {...args, author:author._id}
        try{
          const savedBook = await (await new Book({...book}).save()).populate('author')
          console.log(savedBook);
          return savedBook
        }catch(error){
            throw new GraphQLError('Error adding book: saving error',{
              extensions:{
                code: 'sadfasdf',
                invalidArgs: {title: book.title},
                error
              }
            })
          }
        
        
    },
		editAuthor: async (root, args, context)=>{
       const currentUser = context.currentUser

        if(!currentUser){
          throw new GraphQLError('not authenticated',{
            extensions:{
              code: 'BAD_USER_INPUT',
            }
          })
        }
        
      try{
        const updatedAuthor = await Author.findOneAndUpdate({name:args.name},{born:args.setBornTo},{new:true, runValidators:true})
        return updatedAuthor
      }
        catch(error){
          throw new GraphQLError('Error updating author: incorrect year of birth',{
            extensions:{
              code: 'BAD_USER_INPUT',
              invalidArgs: args.setBornTo,
              error
            }
          })
        }
		},
    createUser: async(root,args)=>{
      const {username,favoriteGenre} = args

      return await userController.createUser({username, favoriteGenre})
    },
    login: async(root,args)=>{
      const {username,password} = args
  
      return await userController.login({username, password })
      
    }
	}
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({req,res})=>{
    const auth = req? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')){
      const decodedToken = jwt.verify(auth.substring(7),process.env.JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return {currentUser}
    }
  }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})