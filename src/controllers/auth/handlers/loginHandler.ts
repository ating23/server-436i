import bcrypt from "bcryptjs"
import { Request, Response, NextFunction } from "express"
import statusCodes from "../../../api/statusCodes"
import { InvalidLoginError } from "../../../errors/messages/AuthErrorMessages"
import { MongoUnavaiableError } from "../../../errors/messages/ServicesErrorMessages"
import { generateAuthorizationToken } from "../helpers/generateAuthorizationToken"
import { validateEmail, validatePassword } from "../../../helpers/requestValidators"
import { LoginInterface } from "../interfaces/AuthRouteInterfaces"
import Logger from "../../../errors/Logger"
import Account from "../../../db/models/Account.model"

/**
 * @Handler
 */
async function handleLogin (req: Request, res: Response, next: NextFunction): Promise<void> {
  const { email, password }: LoginInterface = req.body
  Logger.Log (`Received login request for: ${email}`)

  Account.findOne ({ email }, (error, account) => {
    if (error) {
      Logger.Error ("Error in login. No account found: ", error)
      return next (MongoUnavaiableError)
    }
    else if (!account)  {
      Logger.Error ("Error in login. No account found: ", error)
      return next (InvalidLoginError)
    }

    const { id, name, email, password: hashedPassword } = account
    bcrypt.compare (password, hashedPassword, (error: Error) => {
      if(error) {
        Logger.Error ("Error in login. Password incorrect: ", error)
        return next(InvalidLoginError)
      }
      generateAuthorizationToken({ id })
        .then((token: string) => {
          return res.status(statusCodes.OK).json({
            token,
            name,
            email
          })
        })
        .catch((error: Error) => next(error))
    })
  })
}

const loginHandler = [
  validateEmail,
  validatePassword,
  handleLogin
]

export default loginHandler