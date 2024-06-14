const { GraphQLError } = require('graphql')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const Author = require('./models/Author')
const Book = require('./models/Book')
const userController = require('./controllers/userController')


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
          const savedBook =await (await new Book({...book}).save()).populate('author')
          console.log(savedBook)
          pubsub.publish('BOOK_ADDED', { bookAdded: savedBook })
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
	},
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    },
  },
}

module.exports = resolvers