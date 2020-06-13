import { Request, Response, NextFunction } from "express"
import bcrypt from "bcryptjs"
import { validatePassword, validatePasswordConfirm } from "../../../helpers/requestValidators"
import AccountModel from "../../../db/models/Account.model"
import Logger from "../../../errors/Logger"
import { generateAuthorizationToken } from "../helpers/generateAuthorizationToken"
import statusCodes from "../../../api/statusCodes"

async function resetPassword (req: Request, res: Response, next: NextFunction): Promise<void> {
  const { password } = req.body
  const { id } = res.locals.token
  Logger.Log (`ID: ${id}`)

  const salt = bcrypt.genSaltSync(10)
  const passwordHash = bcrypt.hashSync(password, salt)
  Logger.Log ("Generated password hash.")

  try {
    const account = await AccountModel.findById (id)
    if (!account) {
      return next (Error)
    }
    account.password = passwordHash
    await account.save()
    Logger.Log ("Saved account record: ", account)
    
    // const result = await AccountModel.findOneAndUpdate ({ _id: id }, { password: passwordHash })
    // Logger.Log ("Password updated: ", result)

    generateAuthorizationToken ({ id })
      .then((token: string) => {
        // Logger.Log ("Token generated. Responding to client: ", token)
        return res.status(statusCodes.OK).json({ token })
      })
      .catch((error: Error) => next(error))
  }
  catch (error) {
    Logger.Error ("Error: ", error)
    return next (error)
  }
}

const resetPasswordHandler = [
  validatePassword,
  validatePasswordConfirm,
  resetPassword
]

export default resetPasswordHandler