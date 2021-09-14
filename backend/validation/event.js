const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = validateEventInput = data => {
   let errors = {};

   let { title, description, startTime, endTime } = data;
   // Converting empty fields to empty string as validator function works only with strings
   title = !isEmpty(title) ? title : "";
   description = !isEmpty(description) ? description : "";
   startTime = !isEmpty(startTime) ? startTime: "";
   endTime = !isEmpty(endTime) ? endTime: "";


   if (Validator.isEmpty(title)) {
      errors.title = "Title is required";
   }
   if (Validator.isEmpty(startTime)) {
      errors.body = "start Time is required";
   }
   if (Validator.isEmpty(endTime)) {
    errors.body = "end Time is required";
 }

   return {
      errors,
      isValid: isEmpty(errors)
   };
};