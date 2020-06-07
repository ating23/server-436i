import ErrorHandler from "./ErrorHandler"
import Logger from "./Logger"
import { Request, Response, NextFunction } from "express"

/**
 * If you pass an error to next() and you do not handle it in 
 *  a custom error handler, it will be handled by the built-in 
 *  error handler the error will be written to the client with 
 *  the stack trace. 
 * 
 * The stack trace is not included in the @production environment.
 * 
 */
export default function LogErrorHandler(err: ErrorHandler, _req: Request, _res: Response, next: NextFunction): void {
  Logger.Log("==========================")
  Logger.Log("Express App Error Logger Start: ")
  Logger.Error ("Custom Error Name: ", err.errorName)
  Logger.Error ("Status Code: ", err.statusCode)
  Logger.Error ("Client Message: ", err.errorClientMessage)
  Logger.Error ("Timestamp: ", err.errorTimestamp)
  Logger.Log()
  Logger.Log("Default Error Details: ")
  Logger.Log()
  Logger.Error ("Default Error Name: ", err.name)
  Logger.Log()
  Logger.Log("Express App Error Logger End: ")
  Logger.Log("==========================")
  next(err)
}