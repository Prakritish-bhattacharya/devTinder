const validator = require("validator")
// const nameRegex = /^[\p{L} ]+$/u
const skillRegex = /^[\p{L} ]+$/u
const allowedGenders = ["male", "female", "others"]


const validateSignUpData = (req)=>{
    let {firstName, lastName, emailId, password, profilePhoto, skill, about, gender, age} = req.body
    //  trim white spaces
    firstName = firstName?.trim()
    lastName = lastName?.trim()


    // 👉validation for Names
    if(!firstName || !lastName){
        throw new Error("enter your first and last name currectly")
    }else if(firstName.length < 4 || firstName.length > 50  || lastName.length <4 || lastName.length > 50){
        throw new Error("First and last name must be between 4 and 50 characters")
    }

    // 👉validation for email
    if(!emailId){
        throw new Error("Email is required...")
    }else if(!validator.isEmail(emailId)){
        throw new Error("Invalid email address !!!")
    }

    // 👉validation for Strong password
    if(!password){
        throw new Error("Password is required...")
    }else if(!validator.isStrongPassword(password)){
        throw new Error(
            "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"
        )
    }
    
    // 👉Profile photo URL validation (OPTIONAL FIELD)
    if(profilePhoto){
        if(!validator.isURL(profilePhoto,{
            protocols: ["http","https"],
            require_protocol: true
        })){
            throw new Error("Invalid profile photo URL !!!")
        }
    }

    // 👉 Skill validation (OPTIONAL)
    if(skill){
        if(!Array.isArray(skill)){
            throw new Error("please enter your skills in a proper list format...")
        }else if(skill.length > 10){
            throw new Error("You can add maximum of 10 skills only...")
        }

        for(const s of skill){
            if(!s || !s.trim()){
                throw new Error("Skill name cannot be empty")
            }
            if(!skillRegex.test(s.trim())){
                throw new Error("Skills should contain only letters (no numbers or special symbols)")
            }
        }
    }

    // 👉 About section validation
    if(about){
        if(about.trim().length > 100){
            throw new Error("About section should not be more than 100 characters...")
        }
    }

    // 👉 Gender validation
    if (gender) {
        if (Array.isArray(gender)) {
            throw new Error("Please select only one gender option")
        }
        const normalizedGender = gender.toLowerCase()

        if (!["male", "female", "others"].includes(normalizedGender)) {
            throw new Error("Please select gender as Male, Female, or Others")
        }
        req.body.gender = normalizedGender
    }

    // 👉Age validation
    if(age){
        if(age < 18){
            throw new Error("Age must be greaterthan 18...")
        }
    }


}

module.exports = {
    validateSignUpData
}