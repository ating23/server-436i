import { Request, Response, NextFunction } from "express"
import ErrorHandler from "../ErrorHandler"
import Logger from "../Logger"

Logger.Log("catchAllErrorHandler started and allocated to memory.")

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function catchAllErrorHandler (error: ErrorHandler, req: Request, res: Response, _next: NextFunction): void {
  Logger.Log("Hit the last Error Handler")
  res.status(error.statusCode).json({ error })
  return
}