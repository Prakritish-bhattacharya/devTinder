const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
    },
    password:{
        type: String,
    },
    age:{
        type: Number,
    },
    gender:{
        type: String
    }
})

//  create mongoose Model
const UserModel = mongoose.model("User", userSchema)
// export the model for Use
module.exports = UserModel