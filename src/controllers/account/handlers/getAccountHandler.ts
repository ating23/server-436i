import { Request, Response, NextFunction } from "express";
import AccountModel from "../../../db/models/Account.model";
import { NoAccountFoundError } from "../../../errors/messages/ServicesErrorMessages";
import statusCodes from "../../../api/statusCodes";
import generateURI from "../../auth/helpers/generateURI";
import Logger from "../../../errors/Logger";

export default async function getAccountHandler (req: Request, res: Response, next: NextFunction): Promise<void> {
  const { id } = res.locals.token
  Logger.Log ("Id: ", id)

  try {
    const account = await AccountModel.findById (id)
    Logger.Log ("Account: ", account)
    if (!account) {
      return next (NoAccountFoundError)
    }

    const { name, email } = account
    res.status(statusCodes.OK).json ({
      name,
      email,
      profile: generateURI (`/profile/${id}`)
    })
    return
  }
  catch (error) {
    return next(error)
  }
}