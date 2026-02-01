const express = require("express")
const app = express()


app.use("/use",(req,res)=>{
    res.send("welcome in /use route")
})

app.get("/useGet",(req,res)=>{
    res.send("welcome in /useGet route")
})

app.post("/usePost",(req,res)=>{
    res.send("welcome in /usePost route")
})

app.put("/usePut",(req,res)=>{
    res.send("welcome in /usePut route")
})

app.patch("/usePatch",(req,res)=>{
    res.send("welcome in /usePatch route")
})

app.delete("/useDelete",(req,res)=>{
    res.send("welcome in /useDelete route")
})




app.listen(7777, ()=>{
    console.log("server listen on port number 7777...")
})