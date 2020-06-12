import { Request, Response, NextFunction } from "express"

import { EmailDoesNotExistError } from "../../../errors/messages/AuthErrorMessages"
import StatusCodes from "../../../api/statusCodes"

import { generateAuthorizationToken } from "../helpers/generateAuthorizationToken"
import { validateEmail } from "../../../helpers/requestValidators"
import { ForgotPasswordInterface } from "../interfaces/AuthRouteInterfaces"
import Account from "../../../db/models/Account.model"
import { MongoUnavaiableError, NoAccountFoundError } from "../../../errors/messages/ServicesErrorMessages"
import Logger from "../../../errors/Logger"
import Nodemailer from "../../../helpers/nodemailer/Nodemailer"

async function handleForgotPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { email }: ForgotPasswordInterface = req.body
  try {
    const account = await Account.findOne ({ email })
    if (!account)  {
      Logger.Error ("Error in forgot password. No account found.")
      return next (NoAccountFoundError)
    }

    const { _id: accountId, password, dateCreated } = account
    const payload = { accountId, email }
    const secret = `${password}-${dateCreated}`
    generateAuthorizationToken(payload, secret)
      .then((token: string) => {
        let link: string

        if(process.env.NODE_ENV === "development") {
          link = `http://localhost:3000`
        } else {
          link = "https://puntipin.com"
        }
        link += `/api/reset/${accountId}/${token}`

        const newMail = new Nodemailer ("Name", email, "Reset Password", link)
        newMail.sendMail ()
          .then((info: object) => {
            Logger.Log ("Resolved = ", info)
            return res.status(StatusCodes.OK).send({ link })
          })
          .catch(error => {
            Logger.Error ("Could not send mail: ", error)
            return next(error)
          })
      })
      .catch((e: Error) => {
        return next(e)
      })
  }
  catch (error) {
    Logger.Error ("Error in login. No account found: ", error)
    return next (MongoUnavaiableError)
  }
  // if(!queryResult) {
  //   next(EmailDoesNotExistError)
  // }

  // const payload = { accountId, email }
  // const secret = `${password}-${createdOn}`

  // generateAuthorizationToken(payload, secret)
}

const forgotPasswordHandler = [
  validateEmail,
  handleForgotPassword
]

export default forgotPasswordHandler