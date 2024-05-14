const mongoose =  require('mongoose')

const userSchema ={
    username:{
        type: String,
        required: true,
        minLength:3
    },
    favoriteGenre:{
        type: String,
        required: true 
    }

}

module.exports = mongoose.model('User',userSchema)