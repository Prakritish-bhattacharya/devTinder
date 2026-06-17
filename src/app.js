const express = require("express")
const connectDB = require("./config/database")
const app = express()

connectDB().then(()=>{
    console.log("Database Connected Sucessfully")
    app.listen(7777, ()=>{
        console.log("Server is running on port 7777")
    })
}).catch(err =>{
    console.log("Error connecting to database", err)
})

