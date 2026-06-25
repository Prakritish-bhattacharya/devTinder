const jwt = require("jsonwebtoken")
const User = require("../models/user")


const userAuth = async(req, res, next)=>{
    
    try {
        // Read the token from req.cookies
         const { token }= req.cookies
        // check--if token does't exists then throw an Error
        if(!token){
            throw new Error("Token not found !!!");
        }

        // verify token
        const decodeObj = await jwt.verify(token, "DEV@Tinder$790")
        // extract decoded userId from decodeObj
        const {_id} = decodeObj
        // find User from user model
        const user = await User.findById(_id)
        // if user not exists then Throw Error
        if(!user){
            throw new Error("User not Found !!!");
        }
        req.user = user
        // if token is valid and User is found then call next handler
        next()
    } catch (error) {
        res.status(400).send("ERROR: " + error.message)
    }
}


module.exports = {userAuth}