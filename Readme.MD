MongoDB Connection String ---> "mongodb+srv://namastedev:lXmn4aoFOrF0gN0A@namastenode.6y1z85y.mongodb.net/devTinder"

---
Create Mogoose Model 

mongoose.model("Model_name" , schema)

---
use Express JSON middleware

app.use( express.json())


---
complete login route

===
Implement jwt authentication
===
// Create a JWT Token
const token = await jwt.sign({_id: user._id}, privateKey)
// Add the token to cookie and send the response back to the user
res.cookie("token", token)
---
jwt token compare
---
const decodedMessage = await jwt.verify(token, privateKey)


# Rules of writing APIs
 - Always when ever you writing logic for API call then always cover all corner cases that appear in production
