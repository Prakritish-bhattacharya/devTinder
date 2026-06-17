const express = require("express")
const connectDB = require("./config/database")
const app = express()

app.get("/user", (req,res)=>{
    res.send("Response for /user")
})

connectDB()
    .then(()=>{
        console.log("Database Connected Successfully")
        app.listen(3000, ()=>{
            console.log("Server is running on port 3000")
        })
    })
    .catch(err =>{
        console.log("Error in Database Connection")
    })