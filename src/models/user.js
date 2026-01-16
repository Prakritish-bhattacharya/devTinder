const mongoose = require("mongoose")

// create user schema
const userSchema =  new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName:{
        type: String
    },
    emailId: {
        type: String
    },
    password:{
        type: String
    },
    age:{
        type: Number
    },
    gender:{
        type: String
    }
})

//  create Mongoose model and exports it 
module.exports  = mongoose.model("User", userSchema)