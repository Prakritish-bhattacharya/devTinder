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




// create signUp route
app.post("/signup", async (req,res)=>{
    try {
        // validation of data
        validateSignUpData(req)
        // extract Keys from signUp data which come from req.body
        const {firstName, lastName, emailId, password} = req.body

        // Encrypt the password
        const passwordHash = await bcrypt.hash(password, 10)
        // creating new Instance of the User model
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash
        })
        // now save user along with Hash password
        await user.save()
        // send response back to client
        res.send("User creation Successfull....")
    } catch (error) {
        res.status(400).send("Carefully enter your credentials !!!", + error.message)
    }
})



// create Login route
app.post("/login", async(req,res)=>{
    try{
        //  extract emailId and password from req.body
        const {emailId, password} = req.body

        // check...if email exists then further proceed next step
        const user = await User.findOne({emailId: emailId})
        if(!user){
            throw new Error("Please SignUp first !!!");
        }

        /*========Now compare password with Hash Password
            1) take plainText password from req.body
            2) hash password extract from DB
        */
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(isPasswordValid){

            // create JWT token
            const token = await jwt.sign({_id: user._id}, "DEV@Tinder$790")
            // Add the token to cookie and send the response back to server
            res.cookie("token", token) // cookie take arg as a key: value pair

            res.send("Login Successfull....")
        }else{
            throw new Error("Password is Wrong !!!")
        }
    }catch(error){
        res.status(400).send("User login denied !!!" + error.message)
        
    }
})



// Profile Route
app.get("/profile", userAuth, async(req,res)=>{
    try {
        const user = req.user
        if(!user){
            throw new Error("No User Found !!!");
        }
        res.send(user)
    } catch (error) {
        res.status(400).send("ERROR: " + error.message)
    }
})



connectDB().then(()=>{
    console.log("Database connected successfully...")
    app.listen(7777, ()=>{
        console.log("server started at port number 7777...")
    })
}).catch(err =>{
    console.log("Error connecting Database !!!", err.message)
})
