const mongoose = require("mongoose")

//  create connection to Mongoose Atlas
const connectDB = async ()=>{
   await mongoose.connect("mongodb://namastedev:hLTXK6EFJjvxxm1r@ac-y9kizj9-shard-00-00.6y1z85y.mongodb.net:27017,ac-y9kizj9-shard-00-01.6y1z85y.mongodb.net:27017,ac-y9kizj9-shard-00-02.6y1z85y.mongodb.net:27017/devTinder?ssl=true&replicaSet=atlas-ir0nom-shard-0&authSource=admin&appName=NamasteNode")
}
//mongodb://namastedev:hLTXK6EFJjvxxm1r@ac-y9kizj9-shard-00-00.6y1z85y.mongodb.net:27017,ac-y9kizj9-shard-00-01.6y1z85y.mongodb.net:27017,ac-y9kizj9-shard-00-02.6y1z85y.mongodb.net:27017/devTinder?ssl=true&replicaSet=atlas-ir0nom-shard-0&authSource=admin&appName=NamasteNode


// export connection Instance
module.exports = connectDB
