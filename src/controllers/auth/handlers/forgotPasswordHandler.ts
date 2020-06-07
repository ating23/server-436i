import { Request, Response, NextFunction } from "express"

import { EmailDoesNotExistError } from "../../../errors/messages/AuthErrorMessages"
import StatusCodes from "../../../api/statusCodes"

import { generateAuthorizationToken } from "../helpers/generateAuthorizationToken"
import { validateEmail } from "../../../helpers/requestValidators"
import { ForgotPasswordInterface } from "../interfaces/AuthRouteInterfaces"

async function handleForgotPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { email }: ForgotPasswordInterface = req.body
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