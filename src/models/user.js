const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    profilePhoto: {
        type: String,
        default:
            "https://i.pinimg.com/280x280_RS/79/dd/11/79dd11a9452a92a1accceec38a45e16a.jpg"
    },
    skill: {
        type: [String]
    },
    about: {
        type: String,
        maxlength: 100
    },
    gender: {
        type: String,
        enum: ["male", "female", "others"]
    },
    age:{
        type:Number
    }
})

module.exports = mongoose.model("User", userSchema)
