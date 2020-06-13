import { Request, Response, NextFunction } from "express"
import StatusCodes from "../../../api/statusCodes"
import { validateEmail } from "../../../helpers/requestValidators"
import { ForgotPasswordInterface } from "../interfaces/AuthRouteInterfaces"
import Account from "../../../db/models/Account.model"
import { MongoUnavaiableError, NoAccountFoundError } from "../../../errors/messages/ServicesErrorMessages"
import Logger from "../../../errors/Logger"
import Nodemailer from "../../../helpers/nodemailer/Nodemailer"
import ResetTokenModel from "../../../db/models/ResetToken.model"

async function handleForgotPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { email }: ForgotPasswordInterface = req.body
  try {
    const account = await Account.findOne ({ email })
    if (!account)  {
      Logger.Error ("Error in forgot password. No account found.")
      return next (NoAccountFoundError)
    }

    const { _id: accountId } = account
    const newTokenRecord = new ResetTokenModel ({ accountId })
    newTokenRecord.save ((err, { token }) => {
      if (err) {
        Logger.Error("Error in saving new account on mongodb.")
        return next (err)
      }
      Logger.Log ("Saved new tokeno on mongodb.")
      const newMail = new Nodemailer ("Name", email, "Reset Password", String(token))
      newMail.sendMail ()
        .then((info: object) => {
          Logger.Log ("Resolved = ", info)
          return res.status(StatusCodes.OK)
        })
        .catch(error => {
          Logger.Error ("Could not send mail: ", error)
          return next(error)
        })
    })
  }
  catch (error) {
    Logger.Error ("Error in login. No account found: ", error)
    return next (MongoUnavaiableError)
  }
}

const forgotPasswordHandler = [
  validateEmail,
  handleForgotPassword
]

export default forgotPasswordHandler