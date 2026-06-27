const validator = require("validator");

const validateSignUpData = (req) => {
  // get required field from req.body
  const { firstName, lastName, emailId, password } = req.body;

  // validate all signUp data
  if (!firstName?.trim() || !lastName?.trim()) {
    throw new Error("First and Last Name are required !!!");
  } else if (!validator.isLength(firstName.trim(), { min: 4, max: 20 })) {
    throw new Error("First Name must be between 4 and 20 characters !!!");
  } else if (!validator.isLength(lastName.trim(), { min: 4, max: 30 })) {
    throw new Error("Last Name must be between 4 and 30 characters !!!");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email id is not Valid !!!");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter a Strong password !!!");
  }
};

const validateEditProfileData = (req) => {
  // allowed edit option
  const allowedEditFields = [
    "firstName",
    "lastName",
    "photoUrl",
    "gender",
    "age",
    "about",
    "skills",
  ];
  //    loop through req.body
  /*  Loop through these allowed fields (req.body) and check
      every field which coming from req  is present in my allowedEditFields
   */
  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field),
  );
  return isEditAllowed;
};



//  export
module.exports = { validateSignUpData, validateEditProfileData };
