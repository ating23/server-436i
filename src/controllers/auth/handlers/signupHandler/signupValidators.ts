import { Request, Response, NextFunction } from "express"
import { body, check, validationResult } from "express-validator"
import statusCodes from "../../../../api/statusCodes"
import ErrorHandler from "../../../../errors/ErrorHandler"
import Logger from "../../../../errors/Logger"
import Account from "../../../../db/models/Accounts.model"

export const validateName = 
  check("name")
  .notEmpty()
  .withMessage("Name must be provided.")

export const validateEmailAlreadyExists = 
  body("email")
  .custom(async value => {
    Logger.Log ("Checking if email already exists: ", value)
    try {
      const account = await Account.findOne ({ email: value })
      Logger.Log ("Checking mongodb: ", account)
      if (account) {
        Logger.Log ("Account found and rejecting: ", account)
        return Promise.reject("This email already exists.")
      }
      Logger.Log ("Was not rejected")
      return true
    } 
    catch (error) {
      Logger.Log ("Failed because errro: ", error)
      return Promise.reject("Problem with MongoDB.")
    }
  })

export function handleErrors (req: Request, _res: Response, next: NextFunction): void {
  const errors = validationResult(req)
  Logger.Log("Errors from Validation: ", errors)
  if(errors.isEmpty()) {
    Logger.Log ("No errors found in request.")
    return next()
  }
  return next(new ErrorHandler ("Validation Error", statusCodes.BAD_REQUEST, errors.array()[0].msg))
}