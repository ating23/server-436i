import { Request, Response, NextFunction } from "express"
import StatusCodes from "../../../api/statusCodes"
import { validateEmail } from "../../../helpers/requestValidators"
import { ForgotPasswordInterface } from "../interfaces/AuthRouteInterfaces"
import Account from "../../../db/models/Account.model"
import { MongoUnavaiableError, NoAccountFoundError } from "../../../errors/messages/ServicesErrorMessages"
import Logger from "../../../errors/Logger"
import Nodemailer from "../../../helpers/nodemailer/Nodemailer"
import ResetCodeModel from "../../../db/models/ResetCode.model"
import generateVerifyCodeEmail from "../../../helpers/nodemailer/emails/generateVerifyCodeEmail"

async function handleForgotPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { email }: ForgotPasswordInterface = req.body
  try {
    const account = await Account.findOne ({ email })
    if (!account)  {
      Logger.Error ("Error in forgot password. No account found.")
      return next (NoAccountFoundError)
    }
    const { _id: accountId, name } = account
    const newCodeRecord = new ResetCodeModel ({ accountId })
    newCodeRecord.save ((err, { _id: code }) => {
      if (err) {
        Logger.Error("Error in saving new account on mongodb.")
        return next (err)
      }
      Logger.Log ("Generated code: ", code)

      const subject = `${code} is your Educonnections account recovery code`
      const newMail = new Nodemailer (
        name, 
        email,
        subject,
        generateVerifyCodeEmail (String (code), name, email)
      )
      newMail.sendMail ()
        .then((info: object) => {
          Logger.Log ("Resolved = ", info)
          return res.status(StatusCodes.OK).json({ success: true })
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