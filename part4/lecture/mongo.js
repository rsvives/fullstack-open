const mongoose = require('mongoose')
const config = require('./utils/config')

if (process.argv.length<3) {
  console.log('content as argument')
  process.exit(1)
}

const content = process.argv[2]

const url = config.MONGODB_URI

mongoose.set('strictQuery',false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content,
  date: new Date(),
  important: true,
})


note.save().then(result => {
  console.log('note saved!',result)
  mongoose.connection.close()
})


// Note.find({}).then(result => {
//   result.forEach(note => {
//     console.log(note)
//   })
//   mongoose.connection.close()
// })