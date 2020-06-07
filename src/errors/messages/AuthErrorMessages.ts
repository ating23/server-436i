import ErrorHandler from "../ErrorHandler"
import statusCodes from "../../api/statusCodes"

export const EmailInvalidError = new ErrorHandler (
  "Email Error: Email Invalid",
  statusCodes.BAD_REQUEST,
  "Please enter a valid email address."
)

export const PasswordsDontMatchError = new ErrorHandler (
  "Password Error: Passwords Don't Match",
  statusCodes.BAD_REQUEST,
  "Please enter matching passwords for both fields."
)

export const EmailDoesNotExistError = new ErrorHandler (
  "Email Error",
  statusCodes.BAD_REQUEST,
  "The email provided does not exist."
)

export const InvalidLoginError = new ErrorHandler (
  "Password Error",
  statusCodes.BAD_REQUEST, 
  "The email and password you entered does not match our records."
)