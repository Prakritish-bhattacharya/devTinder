const express = require("express")
const {connectDB} = require("./config/database")
const User = require("./models/user")
const app = express()
app.use(express.json())

app.post("/signup", async(req,res)=>{
    const user = new User(req.body)

    await user.save()
    res.send("User added successfully...")
   
})

// get user by email
app.get("/user", async (req,res)=>{
    const userEmail = req.body.emailId

    try{
        const user = await User.find({emailId: userEmail})
        if(user.length === 0){
            res.status(404).send("User not found")
        }else{
            res.send(user)
        }        
    }catch(err){
        res.status(400).send("Something went wrong !!!")
    }
})

// Fetch API -GET /feed -- get all the users from the database
app.get("/feed", async(req,res)=>{

    try{
        const user = await User.find({})
        res.send(user)
    }catch(err){
        res.status(400).send("Something went wrong !!!")
    }
})

connectDB().then(()=>{
    console.log("Database created successfully...")
    app.listen(7777,()=>{
        console.log("Server created on port umber 7777....")
    })
}).catch((err)=>{
    console.log("Database cannot be created!!!")
})