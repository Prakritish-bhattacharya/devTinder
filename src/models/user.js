const mongoose = require("mongoose")
const  validator = require("validator")
const jwt = require("jsonwebtoken")

// create Schema----> Schema means skeleton of DB
const userSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email Address !!!")
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Please enter strong password !!!");
                
            }
        }
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender is not Valid !!!");
                
            }
        }
    },
    photoUrl: {
        type: String,
        default: "https://i.pinimg.com/474x/51/f6/fb/51f6fb256629fc755b8870c801092942.jpg",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Provide photo URL !!!");
                
            }
        }
    },
    about: {
        type: String,
        default: "This is default about for the user -_-",
        validate(value){
            if(value.length > 200){
                throw new Error("About section can't exceed 200 characters !!!");
                
            }
        }
    },
    skills: {
        type: [String],
        validate(value){
            if(value.length > 20){
                throw new Error("Maximum 20 Skills are Allowed !!!");
                
            }
        }
    }
},{
    timestamps: true
})

userSchema.methods.getJWT = async function(){
    const user = this

    const token = await jwt.sign({_id: user._id}, "DEV@Tinder$790",{
        expiresIn: "7d",
    })

    return token

}

// Model creation
const UserModel = mongoose.model("User", userSchema)
// export User Model
module.exports = UserModel