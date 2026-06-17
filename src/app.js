const express = require("express")
const connectDB = require("./config/database")
const User = require("./models/user")
const app = express()


app.post("/signup", async(req,res)=>{
    const user = new User({
        firstName : "Piku",
        lastName : "Singh",
        emailId : "piku@gmail.com",
        password : "123456"
    })
    await user.save()
    res.send("User created successfully")
})

connectDB().then(()=>{
    console.log("Database Connected Sucessfully")
    app.listen(7777, ()=>{
        console.log("Server is running on port 7777")
    })
}).catch(err =>{
    console.log("Error connecting to database", err)
})

