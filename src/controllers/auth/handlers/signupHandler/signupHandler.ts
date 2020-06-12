import bcrypt from "bcryptjs"
import { Request, Response, NextFunction } from "express"
import { SignupInterface } from "../../interfaces/AuthRouteInterfaces"
import Account from "../../../../db/models/Account.model"
import { validateName, validateEmailAlreadyExists, handleErrors } from "./signupValidators"
import { validateEmail, validatePassword, validatePasswordConfirm } from "../../../../helpers/requestValidators"
import Logger from "../../../../errors/Logger"

function handleSignup (req: Request, res: Response, next: NextFunction): void {
  const { name, email, password }: SignupInterface = req.body
  Logger.Log (`Received request for ${name}`)

  const salt = bcrypt.genSaltSync(10)
  const passwordHash = bcrypt.hashSync(password, salt)
  Logger.Log ("Generated password hash.")

  const newAccount = new Account ({ name, email, password: passwordHash})
  newAccount.save((err, account) => {
    if (err) {
      Logger.Error("Error in saving new account on mongodb.")
      return next (err)
    }
    Logger.Log("Saved new account on mongodb.")
    return res.json({ account })
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