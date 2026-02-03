const mongoose = require("mongoose")
const validator = require("validator")

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
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address: " + value)
            }
        }
    },
    skill:{
        type:[String, String, String]
    },
    profilePhoto:{
        type:String,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid image URL:" + value)
            }
        }
    },
    about:{
        type:String
    },
    password:{
        type:String,
        require:true,
        unique: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Your password is not strong:" + value)
            }
        }
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