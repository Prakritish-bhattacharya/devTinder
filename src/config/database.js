//----------------here we write code for connecting database----------------
const mongoose = require("mongoose")
const connectDB = async() =>{
    await mongoose.connect(
        "mongodb+srv://namastedev:3kvd6ndaCDAuSvdT@namastenode.6y1z85y.mongodb.net/devTinder"
    )
}
// ------------------------
    /*
        we need first DB connection, then server connection...so,
        in App.js we first complete Database connection then connect Server
     */
// ------------------------
module.exports = connectDB //exports connectDB() function to app.js file