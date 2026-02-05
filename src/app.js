const express = require("express")
const {connectDB} = require("./config/database")
const User = require("./models/user")
const {validateSignUpData} = require("./utils/validation")
const bcrypt = require("bcrypt")
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const app = express()
app.use(express.json())
app.use(cookieParser())




//  signUp user....>
app.post("/signup", async(req,res)=>{
    try {
        const {firstName , lastName , emailId , password} = req.body
        // signUp data validation
        validateSignUpData(req)

        // Password Hashing
        const passwordHash = await bcrypt.hash(password,10)
        // creating new instance of the User model
        const user = new User({
            firstName,
            lastName,
            emailId,
            password : passwordHash
        })
        
        await user.save()
        res.send("user saved successfully...")
    } catch (err) {
        res.status(400).send(err.message)
    }
})

//  Login API----->
app.post("/login", async(req,res)=>{
    // login API take password and emailId for login
    try {
        const {emailId, password} = req.body // take emailId and password from req body


        const user = await User.findOne({emailId : emailId})  // find the existing emailId from the database 
        if(!user){ // condition.....if user doesn't exists then throw an error
            throw new Error("Email id is not present...")
        }
        const isPasswordValid  = await  bcrypt.compare(password, user.password)   // compare the password between plain text and encrypted password

        if(isPasswordValid){  // if password matched then send a response 👇

            // create a JWT token for the user
            const token = jwt.sign({ _id : user._id }, "DEV@Tinder$790")
            console.log(token)
            // Add the token to cookie and send the response back to the user
            res.cookie("token",token)


            res.send("user login successfull...")
        }else{  // otherwise throw an error 👇
            throw new Error("Password is not correct...")
        }
    } catch (err) {
        res.status(400).send("ERROR : " + err.message)
    }
})




// profile API
app.get("/profile", async(req,res)=>{
    try{
        const cookies = req.cookies
        console.log(cookies)
        const {token} = cookies
        if(!token){
            throw new Error("Invalid token...")
        }
        //  validate my token
        const decodedMessage = await jwt.verify(token, "DEV@Tinder$790")

        const {_id} = decodedMessage
        console.log("Logged In User is : " + _id)

        const user = await User.findById(_id)
        if(!user){
            throw new Error("User not found...")
        }

        res.send(user)
    }catch(err){
        res.status(400).send("ERROR : " + err.message)
    }
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


// Update data of the user
app.patch("/user/:userId", async(req,res)=>{
    const userId = req.params?.userId
    const data = req.body

    try {
        const ALLOWED_UPDATES = ["profilePhoto","about","gender","age","skill"]
        const isUpdateAllowed = Object.keys(data).every((k)=>
            ALLOWED_UPDATES.includes(k)
        )
        if(!isUpdateAllowed){
            throw new Error("Update not allowed !!!")
        }

        if(data?.skill.length > 10){
            throw new Error("Skills cannot be more than 10...")
        }
        const user = await User.findByIdAndUpdate({_id: userId}, data,{
            returnDocument: "after",
            runValidators: true
        })
        console.log(user)
        res.send("User updated successfully")
    } catch (err) {
        res.status(400).send("Update failed:" + err.message)
    }
})















connectDB().then(()=>{
    console.log("Database connected successfully...")
    app.listen(7777,()=>{
        console.log("Server connected on port number 7777...")
    })
}).catch((err)=>{
    console.log("Database cannot be connected !!!")
})