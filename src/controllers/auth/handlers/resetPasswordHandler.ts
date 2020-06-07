import { Request, Response, NextFunction } from "express"

import { 
  validatePassword, 
  validatePasswordConfirm 
} from "../../../helpers/requestValidators"

async function handleResetPasswordGet (req: Request, res: Response, next: NextFunction): Promise<void> {
  res.send(true)
}
async function handleResetPassword (req: Request, res: Response, next: NextFunction): Promise<void> {
  res.send(true)
}

export const resetPasswordGetHandler = [
  handleResetPasswordGet
]

export const resetPasswordPostHandler = [
  validatePassword,
  validatePasswordConfirm,
  handleResetPassword
]