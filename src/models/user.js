const mongoose = require("mongoose")

const userSchema  = new mongoose.Schema({
    firstName:{
        type:String,
        require:true,
        min:[4, 'Must be at least 4'],
        max:30
    },
    lastName:{
        type:String,
        min:3,
        max:30
    },
    emailId:{
        type:String,
        require:true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Please enter a valid email address']
    },
    skill:{
        type:[String, String, String]
    },
    profilePhoto:{
        type:String
    },
    about:{
        type:String
    },
    password:{
        type:String,
        require:true,
        unique: true
    },
    age:{
        type:String,
        require:true
    },
    gender:{
        type:String,
    }
},{
    timestamps : true
})

module.exports = new mongoose.model("User",userSchema)