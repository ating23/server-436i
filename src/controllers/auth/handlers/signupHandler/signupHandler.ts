import bcrypt from "bcryptjs"
import { Request, Response, NextFunction } from "express"
import { SignupInterface } from "../../interfaces/AuthRouteInterfaces"
import AccountsModel from "../../../../db/models/Accounts.model"
import Logger from "../../../../errors/Logger"
import { generateAuthorizationToken } from "../../helpers/generateAuthorizationToken"
import statusCodes from "../../../../api/statusCodes"
import generateURI from "../../helpers/generateURI"
import { 
  validateName, 
  validateEmailAlreadyExists, 
  handleErrors 
} from "./signupValidators"
import { 
  validateEmail, 
  validatePassword, 
  validatePasswordConfirm 
} from "../../../../helpers/requestValidators"

function handleSignup (req: Request, res: Response, next: NextFunction): void {
  const { name, email, password }: SignupInterface = req.body
  Logger.Log (`Received request for ${name}`)

  const salt = bcrypt.genSaltSync(10)
  const passwordHash = bcrypt.hashSync(password, salt)
  Logger.Log ("Generated password hash.")

  const newAccount = new AccountsModel ({ name, email, password: passwordHash})
  newAccount.save((err, account) => {
    if (err) {
      Logger.Error("Error in saving new account on mongodb.")
      return next (err)
    }
    Logger.Log("Saved new account on mongodb.")

    const { _id: id } = account
    generateAuthorizationToken ({ id })
      .then((token: string) => {
        Logger.Log ("Token generated. Responding to client: ", token)
        return res.status(statusCodes.CREATED).json({
          token,
          profile: generateURI (`/profile/${id}`)
        })
      })
      .catch((error: Error) => next(error))
  })
}

const signupHandler = [
  validateName,
  validateEmail,
  validatePassword,
  validatePasswordConfirm,
  validateEmailAlreadyExists,
  handleErrors,
  handleSignup
]

export default signupHandler