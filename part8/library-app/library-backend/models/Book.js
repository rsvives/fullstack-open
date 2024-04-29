const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minLength:5
    },
    published:{
        type:Number,
        required:true,   
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    },
    genres:{
        type:[String],
        required:true
    }
})

module.exports = mongoose.model('Book',bookSchema)