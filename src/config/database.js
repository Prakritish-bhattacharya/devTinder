const mongoose = require("mongoose")
const connectDB = async()=>{
    await mongoose.connect("mongodb+srv://namastedev:lXmn4aoFOrF0gN0A@namastenode.6y1z85y.mongodb.net/devTinder")
}

module.exports = connectDB