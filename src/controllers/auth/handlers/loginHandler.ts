import bcrypt from "bcryptjs"
import { Request, Response, NextFunction } from "express"
import statusCodes from "../../../api/statusCodes"
import { InvalidLoginError } from "../../../errors/messages/AuthErrorMessages"
import { PosgresUnavaiableError } from "../../../errors/messages/ServicesErrorMessages"
import { generateAuthorizationToken } from "../helpers/generateAuthorizationToken"
import { validateEmail, validatePassword } from "../../../helpers/requestValidators"
import { LoginInterface } from "../interfaces/AuthRouteInterfaces"

/**
 * @Handler
 */
async function handleLogin (req: Request, res: Response, next: NextFunction): Promise<void> {
  // Get data from request body
  const { email, password }: LoginInterface = req.body

  // // Look for user in the database
  // try {
  //   const { 
  //     account_id: accountId,
  //     password: hashedPassword 
  //   } = await Postgres.one("SELECT account_id, password FROM accounts WHERE email = $1", [email])

  //   bcrypt.compare(password, hashedPassword, (error: Error) => {
  //     if(error) {
  //       return next(InvalidLoginError)
  //     }

  //     generateAuthorizationToken({ accountId })
  //       .then((token: string) => res.status(statusCodes.OK).json({ token }))
  //       .catch((error: Error) => next(error))
  //   })

  // } catch(error) {
  //   return next(PosgresUnavaiableError)
  // }
}

const loginHandler = [
  validateEmail,
  validatePassword,
  handleLogin
]

export default loginHandler