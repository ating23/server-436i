import { check, body } from "express-validator"

export const validateEmail =  
  body("email")
  .trim()
  .notEmpty().withMessage("Please enter an email address.")
  .isEmail().withMessage("Please enter a valid email address.")
  .normalizeEmail()

export const validatePassword = 
  check("password")
  .notEmpty().withMessage("Please enter a password.")
  .isLength({ min: 8 }).withMessage("Please enter a password with at least 8 characters.")

export const validatePasswordConfirm = 
  check("passwordConfirmation")
  .notEmpty().withMessage ("Please provide a password.")
  .isLength ({ min: 8}).withMessage("Please provide a password with at least 8 characters long.")
  .custom((inputPwdConfirm: string, { req }) => {
    if(inputPwdConfirm !== req.body.password) {
      throw Error("Passwords do not match.")
    }
    // Indicates the success of this synchronous custom validator
    return true
  })