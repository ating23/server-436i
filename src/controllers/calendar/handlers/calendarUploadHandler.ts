import { Request, Response, NextFunction } from "express"
import multer from "multer"
import Logger from "../../../errors/Logger"
import parseCalendar from "../helpers/parseCalendar"
import { CalendarNullUploadError, CalendarUploadFileTypeError } from "../../../errors/messages/ServicesErrorMessages"
import writeCoursesToDB from "../helpers/writeCoursesToDB"
import { 
  convertCalendarBufferToString, 
  convertCalendarStringToArray, 
  validateCalendar, 
  generateCalendarApiResponse
} from "../helpers/uploadCalendarHelpers"

const upload = multer()

async function handleCalendarUpload (req: Request, res: Response, next: NextFunction): Promise<void> {
  const accountId = res.locals.token.id
  const calendar = req.file
  
  try {
    console.log("calendar: " + req.file)
    validateCalendar (calendar)

    const calendarString = convertCalendarBufferToString (calendar)
    const calendarData = convertCalendarStringToArray (calendarString)
    const calendarParsed = parseCalendar (calendarData)
        
    Promise.all(calendarParsed.map(async (item) => {
      return await writeCoursesToDB (item, accountId)
    }))
    .then((results => {
      res.json (generateCalendarApiResponse(results))
    }))
    .catch((err) => {
      return next(err)
    })
    return 
  } 
  catch (error) {
    if (error.message === "Calendar upload was unsuccessful.") {
      next(CalendarNullUploadError)
    } 
    if (error.message === "The file type that you uploaded is invalid.") {
      next(CalendarUploadFileTypeError)
    }
    Logger.Error (error)
    return next (error)
  }
}

const calendarUploadHandler = [
  upload.single ("calendar"),
  handleCalendarUpload
]

export default calendarUploadHandler