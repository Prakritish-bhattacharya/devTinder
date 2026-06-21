const mongoose = require("mongoose")
const validator = require("validator")

const userSchema = new mongoose.Schema({
    firstName :{
        type: String,
    },
    lastName :{
        type: String,
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email Address!!!")
            }
        }
    },
    password :{
        type: String,
        required: true,
    },
    age :{
        type : Number,
        min: 18,
    },
    gender :{
        type : String,
        validate(value){
            if (!["male","female","others"].includes(value)){
                throw new Error("Gender data is  ot valid !!!")
            }
        }
    },
    photoUrl:{
        type: String,
        default: "https://i.pinimg.com/474x/51/f6/fb/51f6fb256629fc755b8870c801092942.jpg",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid Photo URL:" + value)
            }
        }

    },
    about:{
        type: String,
        default: "This is default about of the User !",
    },
    skills: {
        type: [String],
    }
},
 {
    timestamps: true
 }
)


const UserModel = mongoose.model("User", userSchema)
module.exports  = UserModel