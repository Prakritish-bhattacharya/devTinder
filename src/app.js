const express = require("express")
const connectDB = require("./config/database.js")
const cookieParser = require("cookie-parser")
const app = express()
const cors = require("cors")


app.use(cors())
// Use express JSON middleware
app.use( express.json())
// Use cookie parser
app.use(cookieParser())


// import Routers from Router module
const authRouter = require("./routers/auth.js")
const profileRouter = require("./routers/profile.js")
const requestRouter = require("./routers/request.js")
const userRouter = require("./routers/user.js")

// asign routers
app.use("/", authRouter)      // Authentication Router
app.use("/", profileRouter)  // Profile Router
app.use("/", requestRouter) // connection request router 
app.use("/", userRouter)   // User Router







connectDB().then(()=>{
    console.log("Database connected successfully...")
    app.listen(7777, ()=>{
        console.log("server started at port number 7777...")
    })
}).catch(err =>{
    console.log("Error connecting Database !!!", err.message)
})
