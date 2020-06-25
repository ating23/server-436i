import { Request, Response, NextFunction } from "express"
import multer from "multer"
import Logger from "../../../errors/Logger"
import { 
  convertCalendarBufferToString, 
  convertCalendarStringToArray, 
  generateCalendarMongoDocuments, 
  validateCalendar 
} from "../helpers/uploadCalendarHelpers"
import CourseModel from "../../../db/models/Course.model"
import parseCalendar from "../helpers/parseCalendar"

const accountId = "1"

const upload = multer()

async function handleCalendarUpload (req: Request, res: Response, next: NextFunction): Promise<void> {
  // const accountId = res.locals.token.accountId
  const calendar = req.file
  
  try {
    validateCalendar (calendar)

    const calendarString = convertCalendarBufferToString (calendar)
    const calendarData = convertCalendarStringToArray (calendarString)
    const calendarParsed = parseCalendar (calendarData)
    const courses = generateCalendarMongoDocuments (accountId, calendarParsed)

    const result = await CourseModel.insertMany (courses)
    Logger.Log ("Successfully inserted courses: ", result)
    res.json ({ result })
    return 
  } 
  catch (error) {
    Logger.Error (error)
    return next (error)
  }
}

const calendarUploadHandler = [
  upload.single ("calendar"),
  handleCalendarUpload
]

export default calendarUploadHandler