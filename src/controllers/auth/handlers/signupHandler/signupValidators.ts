import { Request, Response, NextFunction } from "express"
import { body, check, validationResult } from "express-validator"
import statusCodes from "../../../../api/statusCodes"
import ErrorHandler from "../../../../errors/ErrorHandler"
import Logger from "../../../../errors/Logger"
import Account from "../../../../db/models/Account.model"

export const validateName = 
  check("name")
  .notEmpty()
  .withMessage("Name must be provided.")

export const validateEmailAlreadyExists = 
  body("email")
  .custom(value => {
    Logger.Log ("Checking if email already exists: ", value)
    Account.findOne ({ email: value }, function (err, account) {
      Logger.Log ("Checking mongodb: ", account)
      if (err) {
        Logger.Log ("Failed because errro: ", err)
        return Promise.reject("Problem with MongoDB.")
      }
      if (account) {
        Logger.Log ("Account found and rejecting: ", account)
        return Promise.reject("This email already exists.")
      }
      Logger.Log ("Was not rejected")
      return true
    })
  })

export function handleErrors (req: Request, _res: Response, next: NextFunction): void {
  const errors = validationResult(req)
  Logger.Log("Errors from Validation: ", errors)
  if(errors.isEmpty()) {
    Logger.Log ("No errors found in request.")
    return next()
  }

  return next(new ErrorHandler ("Validation Error", statusCodes.BAD_REQUEST, "Validation errors in Signup"))
}