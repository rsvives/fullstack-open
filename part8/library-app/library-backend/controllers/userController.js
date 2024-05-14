const jwt = require('jsonwebtoken')
const User = require("../models/User");
const { GraphQLError } = require('graphql');

const login = async (creds)=>{
    const {username,password} = creds
    const user = await User.findOne({ username })

    if(!user || password!=='secretpassword'){
        throw new GraphQLError('wrong credentials',{
            extensions:{
                code: 'BAD_USER_INPUT'
            }
        })
    }
    const userForToken = {
        id: user._id,
        username:user.username
    }


    return{
        value: await jwt.sign(userForToken, process.env.JWT_SECRET)
    }

}
const createUser = async (data)=>{
    console.log(data);
    const user = new User({...data})

    return await user.save()
    .catch(error=>{
        throw new GraphQLError('Creating user failed',{
            extensions:{
                code:'BAD_USER_INPUT',
                invalidArgs: data.username,
                error
            }
        })
    })

    
}

module.exports = {
    login,
    createUser
}