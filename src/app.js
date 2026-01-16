const express = require("express") // import "express" from node modules
const connectDB = require("./config/database") // import Database file
const app = express() // create an app instance of express()
const User = require("./models/user")// import userModel
// --------------------------
    // create an API👇
// --------------------------
// 👉signUP API
app.post("/signup", async (req,res) =>{
    //  creating new instance of the user model
    const user = new User({
        firstName: "Sohini",
        lastName: "Chatterjee",
        emailId: "sohini@gmail.com",
        password: "sohini@195"
    })
     try{
        await user.save()// it return a promise, so we need to use async/await
        res.send("User addes successfully")
    }catch(err){
        res.status(400).send("Error saving the user:"+ err.message)
    }
})


connectDB().then(() =>{//first trying connect DB and server in try() block
    console.log("Database connection established...")//first we try to connect with Database
    app.listen(7777, () =>{
        console.log("Server successfully listening on port 7777...")//After connecting DB we want to connect the server
    })
}).catch((err) =>{//hendle the error if DB not connect & then throw the error
    console.log("Database cannot be connected!!!")
})
