require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery',false)
mongoose.connect(url)
    .then((res)=>{
        console.log('connected to MongoDB');
    })
    .catch(err=>{
        console.error('could not connect to MongoDB', err);
    })

// Schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: [true, 'User name required']
  },
  number: {
    type: String,
    validate:{
        validator: function(v) {
            return /(\d{2}-\d{6,})|(\d{3}-\d{5,})/.test(v);
        },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'User phone number required']
  }
})

// Transform toJSON
personSchema.set('toJSON',{
    transform: (document, returnedObject)=>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

//Export
module.exports = mongoose.model('Person',personSchema)