import { Request, Response, NextFunction } from "express";
import AccountModel, { AccountsDocument } from "../../../db/models/Accounts.model";
import { NoAccountFoundError } from "../../../errors/messages/ServicesErrorMessages";
import statusCodes from "../../../api/statusCodes";
import generateURI from "../../auth/helpers/generateURI";
import Logger from "../../../errors/Logger";
import { AccountApiReponse } from "./accountTypes";

function generateAccountApiResponse(account: AccountsDocument): AccountApiReponse {
  return {
    uuid: account.id,
    name: account.name,
    email: account.email,
    spotifyVerified: account.spotifyVerified,
    spotify: account.spotify,
    facebookVerified: account.facebookVerified,
    courses: account.courses
  }
}

export default async function getAccountHandler (req: Request, res: Response, next: NextFunction): Promise<void> {
  const { id } = res.locals.token
  Logger.Log ("Id: ", id)

  try {
    const account = await AccountModel.findById (id)
    Logger.Log ("Account: ", account)
    if (!account) {
      return next (NoAccountFoundError)
    }

    const ret = generateAccountApiResponse(account);
    
    res.status(statusCodes.OK).json (ret)
    return
  }
  catch (error) {
    return next(error)
  }
}