const express = require("express")

const app = express()


app.use((req, res)=>{
    res.status(404).send("<h1>404 error page not found</h1>")
})


app.listen(3000, ()=>{
    console.log("server successfully started on port 3000")
})