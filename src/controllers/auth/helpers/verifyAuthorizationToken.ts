import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
import Logger from "../../../errors/Logger"
import { NoTokenError, InvalidTokenError } from "../../../errors/messages/AccessErrorMessages"
import { SECRET_OR_PRIVATE_KEY } from "../../../config/jwtConfig"

export function verifyAuthorizationToken (req: Request, res: Response, next: NextFunction): void {
  const bearerHeader = req.headers["authorization"]
  
  if(!bearerHeader || bearerHeader === "") {
    Logger.Error ("did not find a bearer token.")
    return next (NoTokenError)
  } 
  else {
    const token = bearerHeader.split(" ")[1]
    const decoded = jwt.verify (token, SECRET_OR_PRIVATE_KEY)
    if(!decoded) {
      Logger.Error ("the jwt token did not successfully verify.")
      return next(InvalidTokenError)
    }
    res.locals.token = decoded
    Logger.Log ("Token successfully found on server. Decoded: ", decoded)
    return next()
  }
}