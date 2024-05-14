const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
    name:{
        type: String,
        minLength:3,
        required:true
    },
    born:{
        type: Number,
        max:new Date().getFullYear()
    },
    bookCount:{
        type:Number,
        default:0,
    }
})

module.exports = mongoose.model('Author', authorSchema)