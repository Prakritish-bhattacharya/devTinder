const express = require("express") // import "express" from node modules
const connectDB = require("./config/database") // import Database file
const app = express() // create an app instance of express()

connectDB().then(() =>{//first trying connect DB and server in try() block
    console.log("Database connection established...")//first we try to connect with Database
    app.listen(7777, () =>{
        console.log("Server successfully listening on port 7777...")//After connecting DB we want to connect the server
    })
}).catch((err) =>{//hendle the error if DB not connect & then throw the error
    console.log("Database cannot be connected!!!")
})
