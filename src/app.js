const express = require("express")
const app = express()

app.use("/get",(req,res)=>{
    res.send("hello from /get route...")
})
app.listen(7777 , ()=>{
    console.log("server listening successfully on port number 7777...")
})