const express = require("express") // import "express" from node modules
const app = express() // create an app instance of express()

app.use("/test",(req,res) =>{
    res.send("You are in test page!!!")
})
app.use("/",(req,res) =>{
    res.send("Hello from the server !!!")
})

app.listen(3000, () =>{
    console.log("server is successfully listening on port 3000...")
})// The server listens for incoming HTTP requests on port number 3000.