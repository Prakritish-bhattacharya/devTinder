const express = require("express")
const { userAuth } = require("../middleware/auth")
const requestRouter = express.Router()


//  connection request API
requestRouter.get("/connectionRequest", userAuth, async(req,res)=>{
    try {
        const user = req.user
        // if(!user){
        //     throw new Error("User not found!!!")
        // }
        res.send(`${user.firstName} send you a connection request...`)
    } catch (error) {
        res.status(400).send(error.message)
    }
})



module.exports = requestRouter