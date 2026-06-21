const validator = require("validator")

const validateSignUpData = (req)=>{
    // get requires field from req.body
    const {firstName, lastName, emailId, password} = req.body
    // put Names validation
    if(!firstName || !lastName){
        throw new Error("first and last name are required !!!")
    }else if(!validator.isEmail(emailId)){
        throw new Error("Email id is not Valid !!!")
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter strong Password !!!")
    }
}

// Export it
module.exports = {validateSignUpData}