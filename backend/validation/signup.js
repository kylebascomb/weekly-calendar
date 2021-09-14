const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = validateSignUpInput = data => {
   let errors = {};

   let { email, firstname, lastname, username, password } = data;
   //Converting empty fields to an empty string so that we can use validator function as it works only with strings
   firstname = !isEmpty(firstname) ? firstname : "";
   lastname = !isEmpty(lastname) ? lastname: "";
   email = !isEmpty(email) ? email : "";
   username = !isEmpty(user_name) ? user_name : "";
   password = !isEmpty(password) ? password : "";
   

   if (Validator.isEmpty(firstname)) {
      errors.user_name = "First Name is required";
   }

   if (Validator.isEmpty(lastname)) {
    errors.user_name = "Last Name is required";
 }

   if (Validator.isEmpty(email)) {
      errors.email = "Email is required";
   } else if (!Validator.isEmail(email)) {
      errors.email = "Enter a valid email id";
   }

   if (Validator.isEmpty(password)) {
      errors.password = "Password is required";
   } else if (!Validator.isLength(password, { min: 6 })) {
      errors.password = "Password must be at least 6 characters";
   }

   return {
      errors,
      isValid: isEmpty(errors)
   };
};