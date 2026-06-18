const express = require("express")
const connectDB = require("./config/database.js")
const User = require("./models/user.js")
const app = express()
// import express JSON middleware
app.use( express.json())


// create Route
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


connectDB().then(()=>{
    console.log("Database connected Successfully...")
    // Listening the server
    app.listen(7777, ()=>{
        console.log("Server started at port number 7777...")
    })
}).catch(err =>{
    console.log("Error connecting to Database", err.message)
})
