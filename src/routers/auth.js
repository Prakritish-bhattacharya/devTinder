const express = require("express")
const User = require("../models/user.js")
const {validateSignUpData} = require("../utils/validation.js")
const bcrypt = require("bcrypt")
const authRouter = express.Router()

// signUp Route
authRouter.post("/signup", async (req,res)=>{
    try {
        // validation of data
        validateSignUpData(req)
        // extract Keys from signUp data which come from req.body
        const {firstName, lastName, emailId, password} = req.body

        // Encrypt the password
        const passwordHash = await bcrypt.hash(password, 10)
        // creating new Instance of the User model
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash
        })
        // now save user along with Hash password
        await user.save()
        // send response back to client
        res.send("User creation Successfull....")
    } catch (error) {
        // console.log(error)
        res.status(400).send("Carefully enter your credentials !!!", + error.message)
    }
})

// Login Routre
authRouter.post("/login", async(req,res)=>{
    try{
        //  extract emailId and password from req.body
        const {emailId, password} = req.body

        // check...if email exists then further proceed next step
        const user = await User.findOne({emailId: emailId})
        if(!user){
            throw new Error("Please SignUp first !!!");
        }

        /*========Now compare password with Hash Password
            1) take plainText password from req.body
            2) hash password extract from DB
        */
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(isPasswordValid){

            // create JWT token
            const token = await user.getJWT()
            // Add the token to cookie and send the response back to server
            res.cookie("token", token) // cookie take arg as a key: value pair

            res.send("Login Successfull....")
        }else{
            throw new Error("Password is Wrong !!!")
        }
    }catch(error){
        res.status(400).send("User login denied !!!" + error.message)
        
    }
})


// LogOut API
authRouter.post("/logout", async(req,res)=>{
    try {
        res.cookie("token", null,{
            expires: new Date(Date.now())
        })
        res.send(` logout successfull...`)
    } catch (error) {
        res.status(400).send("something wrong when Logout!!!")
    }
})


module.exports = authRouter