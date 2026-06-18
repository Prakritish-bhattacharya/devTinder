const express = require("express")
const connectDB = require("./config/database.js")
const User = require("./models/user.js")
const app = express()
// import express JSON middleware
app.use( express.json())


// create Signup Route
app.post("/signup", async (req,res)=>{
    const user  = new User(req.body)
    try {
        // save the user
        await user.save()
        // console.log(req.body)
        res.send("User created Successfully...")

    } catch (error) {
        res.status(400).send("In Signup Route...", error)        
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
app.patch("/user", async(req,res)=>{
    const userId = req.body.userId
    const data = req.body
    try {
        await User.findByIdAndUpdate({_id: userId}, data)
        res.send("User Updated successfully...")
    } catch (error) {
        res.status(400).send("Something went wrong !!!")
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
