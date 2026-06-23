const express = require("express")
const connectDB = require("./config/database.js")
const User = require("./models/user.js")
const {validateSignUpData} = require("./utils/validation.js")
const bcrypt = require("bcrypt")
const cookie = require("cookie-parser")
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const { userAuth } = require("./middleware/auth.js")
const app = express()
// Use express JSON middleware
app.use( express.json())
// Use cookie parser
app.use(cookieParser())


// create Signup Route
app.post("/signup", async (req,res)=>{
    try {
        // Validation of Data
        validateSignUpData(req)
        const {firstName, lastName, emailId, password} = req.body


        // Encrypt the Password
        const passwordHash = await bcrypt.hash(password, 10)
        // console.log(passwordHash)

        // Creating new instance of the User Model
        const user  = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash
        })
    
        // save the user
        await user.save()
        res.send("User created Successfully...")
    } catch (error) {
        res.status(400).send("In Signup Route..." + error.message)        
    }
    
})

// Login route
app.post("/login", async(req,res)=>{
    try {
        // extract emailId and password
        const {emailId, password} = req.body
        // find user emailId from DB
        const user = await User.findOne({emailId : emailId})
        // if email does't exists then throw error
        if(!user){
            throw new Error("Email id is not present !!!")
        }
        /* compare two password type
                1) plainText password ---> come from req.body
                2) hash passwrod      ---> extract hash form from DB
            and bcrypt.compare return a boolean value
         */
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(isPasswordValid){

            // Create a JWT Token
            const token = await jwt.sign({_id: user._id}, "DEV@Tinder$790")
            // console.log(token)
            // Add the token to cookie and send the response back to the user
            res.cookie("token", token)


            res.send("Login successfull....")
        }else{
            throw new Error("password is wrong !!!")
        }

    } catch (error) {
        res.status(400).send("User Login denied !!!" + error.message)
    }
})

// profile Route
app.get("/profile", userAuth, async (req,res)=>{
    try{
        const user = req.user
        if(!user){
            throw new Error("No user found")
        }
        res.send(user)
    }catch(error){
        res.status(400).send("ERROR: " + error.message)
    }
})



connectDB().then(()=>{
    console.log("Database connected Successfully...")
    // Listening the server
    app.listen(7777, ()=>{
        console.log("Server started at port number 7777...")
    })
}).catch(err =>{
    console.log("Error connecting to Database", err.message)
})
