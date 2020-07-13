import { Request, Response, NextFunction } from "express"
import ResetCodeModel from "../../../db/models/ResetCodes.model"
import Logger from "../../../errors/Logger"
import { generateAuthorizationToken } from "../helpers/generateAuthorizationToken"
import statusCodes from "../../../api/statusCodes"
import generateURI from "../helpers/generateURI"

async function verifyResetCode (req: Request, res: Response, next: NextFunction): Promise<void> {
  const { code } = req.body

  ResetCodeModel.findOne ({ _id: code }, (error, account) => {
    if (error || !account) {
      Logger.Error("Error in saving new account on mongodb.")
      return next (error)
    }
    Logger.Log ("Found reset code: ", account)
    const { accountId: id } = account
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

const verifyResetCodeHandler = [
  verifyResetCode
]

export default verifyResetCodeHandler