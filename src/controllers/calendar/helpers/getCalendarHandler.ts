import { Request, Response, NextFunction } from "express"
import CalendarModel from "../../../db/models/Course.model"
import statusCodes from "../../../api/statusCodes"
import generateURI from "../../auth/helpers/generateURI"
import Logger from "../../../errors/Logger"

export default async function getCalendarHandler (req: Request, res: Response, next: NextFunction): Promise<void> {
  const { id } = res.locals.token
  Logger.Log ("Id: ", id)

  try {
    const account = await CalendarModel.findById (id)
    Logger.Log ("Calendar: ", account)
    if (!account) {
      next (new Error ())
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