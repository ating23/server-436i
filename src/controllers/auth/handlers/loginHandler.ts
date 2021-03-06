import bcrypt from "bcryptjs"
import { Request, Response, NextFunction } from "express"
import statusCodes from "../../../api/statusCodes"
import { InvalidLoginError } from "../../../errors/messages/AuthErrorMessages"
import { MongoUnavaiableError } from "../../../errors/messages/ServicesErrorMessages"
import { generateAuthorizationToken } from "../helpers/generateAuthorizationToken"
import { validateEmail, validatePassword } from "../../../helpers/requestValidators"
import { LoginInterface } from "../interfaces/AuthRouteInterfaces"
import Logger from "../../../errors/Logger"
import AccountsModel from "../../../db/models/Accounts.model"
import generateURI from "../helpers/generateURI"

/**
 * @Handler
 */
async function handleLogin (req: Request, res: Response, next: NextFunction): Promise<void> {
  const { email: clientEmail, password: clientPassword }: LoginInterface = req.body
  Logger.Log (`Received login request for: ${clientEmail}`)

  try {
    const account = await AccountsModel.findOne ({ email: clientEmail })
    Logger.Log ("Mongo query complete.")
    if (!account)  {
      Logger.Error ("Error in login. No account found: ", account)
      return next (InvalidLoginError)
    }
    
    Logger.Log ("Found account: ", account)
    const { _id: id, password: hashedPassword } = account

    Logger.Log ("Beginning password has compare.")
    bcrypt.compare (clientPassword, hashedPassword)
    .then ((result) => {
      if(!result) {
        Logger.Error ("Error in login. Password incorrect: ")
        return next(InvalidLoginError)
      }
      Logger.Log ("Passwords match: ", result)
      generateAuthorizationToken({ id })
        .then((token: string) => {
          Logger.Log ("Token generated. Responding to client: ", token)
          return res.status(statusCodes.OK).json({
            token,
            profile: generateURI (`/profile/${id}`)
          })
        })
        .catch((error: Error) => next(error))
    })
  }
  catch (error) {
    Logger.Error ("Error in login. No account found: ", error)
    return next (MongoUnavaiableError)
  }
}

const loginHandler = [
  validateEmail,
  validatePassword,
  handleLogin
]

export default loginHandler