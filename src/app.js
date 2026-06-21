const express = require("express")
const connectDB = require("./config/database.js")
const User = require("./models/user.js")
const {validateSignUpData} = require("./utils/validation.js")
const bcrypt = require("bcrypt")
const app = express()
// import express JSON middleware
app.use( express.json())


// create Signup Route
app.post("/signup", async (req,res)=>{
    try {
        // Validation of Data
        validateSignUpData(req)
        const {firstName, lastName, emailId, password} = req.body


        // Encrypt the Password
        const passwordHash = await bcrypt.hash(password, 10)
        // console.log(passwordHash)

        // Creating new instance of the User Model
        const user  = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash
        })
    
        // save the user
        await user.save()
        res.send("User created Successfully...")
    } catch (error) {
        res.status(400).send("In Signup Route..." + error.message)        
    }
    
})

// Login route
app.post("/login", async(req,res)=>{
    try {
        // extract emailId and password
        const {emailId, password} = req.body
        // find user emailId from DB
        const user = await User.findOne({emailId : emailId})
        // if email does't exists then throw error
        if(!user){
            throw new Error("Email id is not present !!!")
        }
        /* compare two password type
                1) plainText password ---> come from req.body
                2) hash passwrod      ---> extract hash form from DB
            and bcrypt.compare return a boolean value
         */
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(isPasswordValid){
            res.send("Login successfull....")
        }else{
            throw new Error("password is wrong !!!")
        }

    } catch (error) {
        res.status(400).send("User Login denied !!!" + error.message)
    }
})

// Get Users by EmailId
app.get("/user", async(req,res)=>{
    const userEmail = req.body.emailId

    try {
        const users = await User.find({emailId : userEmail})
        if(users.length === 0){
            res.status(404).send("User not found")
        }else{
            res.send(users)
        }
    } catch (error) {
        res.status(400).send("Something went wrong !!!")
    }
})

// Feed API
app.get("/feed", async(req,res)=>{
    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        res.status(400).send("Something went wrong !!!")
    }
})

//  Estimate Document count
app.get("/estimateDoc", async(req,res)=>{
    try {
        const numUsers = await User.estimatedDocumentCount()
        res.send(numUsers)
    } catch (error) {
        res.status(400).send("Document not found !!!")
    }
    
})

//  Delete a user from DB
app.delete("/user", async(req,res)=>{
    const userId = req.body.userId
    try {
        const user = await User.findByIdAndDelete({_id: userId})
        res.send("User deleted Successfully...")
    } catch (error) {
        res.status(400).send("Something went wrong !!!")
    }
})

// Update user data
app.patch("/user/:userId", async(req,res)=>{
    const userId = req.params?.userId
    const data = req.body
    try {
        const ALLOWED_UPDATES = [
            "photoUrl",
            "about",
            "gender",  
            "age",
            "skills"
        ]
        const isUpdateAllowed = Object.keys(data).every((k)=>
            ALLOWED_UPDATES.includes(k)
        )
        if(!isUpdateAllowed){
            throw new Error("Update is not Allowed !!!")
        }
        await User.findByIdAndUpdate({_id: userId}, data, {
            returnDocument: "after",
        })
        res.send("User Updated successfully...")
    } catch (error) {
        res.status(400).send("Something went wrong !!!" + error.message)
    }
})


connectDB().then(()=>{
    console.log("Database connected Successfully...")
    // Listening the server
    app.listen(7777, ()=>{
        console.log("Server started at port number 7777...")
    })
}).catch(err =>{
    console.log("Error connecting to Database", err.message)
})
