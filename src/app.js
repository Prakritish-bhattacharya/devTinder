const express = require("express")
const app = express()

// Route Handler
app.use("/home",(req,res)=>{
    res.send("<h1>Welcome to Express JS</h1>")
})

app.listen(3000,()=>{
    console.log("Server stared at port number 3000")
})