const jwt = require("jsonwebtoken")
const User = require("../models/user")
const userAuth = async (req, res, next)=>{
    //  Read the token from the req.cookies
    try{
        const {token} = req.cookies // get token from req.cookies
        if(!token){
            throw new Error("Token not found !!!!!!!");
            
        }

        const decodeObj = await jwt.verify(token, "DEV@Tinder$790") // verify token and privateKEY

        const {_id} = decodeObj // extract userId from cookie

        const user = await User.findById(_id) // find user from User model
        if(!user){ // if User not found then throw error
            throw new Error("User not found");
        
        }
        req.user = user
        next() // if token is valid and User is found then call next handler

    }catch (err){
        res.status(400).send("ERROR: " + err.message)
    }

}

module.exports = {
    userAuth
}