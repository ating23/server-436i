import jwt from "jsonwebtoken"
import { jwtConfig, SECRET_OR_PRIVATE_KEY } from "../../../config/jwtConfig"
// import Logger from "../../../errors/Logger"

type TokenPayload = string | object

export function generateAuthorizationToken (payload: TokenPayload, providedSecret?: string): Promise<string>  {
  const secret = providedSecret || SECRET_OR_PRIVATE_KEY
  
  return new Promise (function (resolve: (e: string) => void, reject: (e: string) => void) {
    const token = jwt.sign(payload, secret, jwtConfig)
    // Logger.Log ("Generated token: ", token)
    if(!token) return reject(token)
    else return resolve(token)
  })
}