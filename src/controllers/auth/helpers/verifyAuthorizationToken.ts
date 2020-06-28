import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
import Logger from "../../../errors/Logger"
import { NoTokenError, InvalidTokenError } from "../../../errors/messages/AccessErrorMessages"
import { SECRET_OR_PRIVATE_KEY } from "../../../config/jwtConfig"

export function verifyAuthorizationToken (req: Request, res: Response, next: NextFunction): void {
  const bearerHeader = req.headers["authorization"]
  Logger.Log ("Header: ", bearerHeader)
  
  if(!bearerHeader || bearerHeader === "") {
    Logger.Error ("Did not find a bearer token.")
    return next (NoTokenError)
  } 

  const token = bearerHeader.split(" ")[1]
  try {
    const decoded = jwt.verify (token, SECRET_OR_PRIVATE_KEY)
    Logger.Log ("Token successfully found on server. Decoded: ", decoded)
    res.locals.token = decoded
    return next ()
  }
  catch (error) {
    Logger.Error ("The jwt token did not successfully verify.")
    return next(InvalidTokenError)
  }

}