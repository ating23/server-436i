import { Request, Response, NextFunction } from "express"
import multer from "multer"
import saveCourses from "./helpers/saveCourses"
import parseCalendar from "./helpers/parseCalendar"
import Logger from "../../../../errors/Logger"
import generateResponse from "./helpers/generateResponse"
import { 
  CalendarNullUploadError, 
  CalendarUploadFileTypeError 
} from "../../../../errors/messages/ServicesErrorMessages"
import { 
  convertCalendarBufferToString, 
  convertCalendarStringToArray, 
  validateCalendar
} from "./helpers/uploadCalendarHelpers"

const upload = multer()

async function handleUploadCourses (req: Request, res: Response, next: NextFunction): Promise<void> {
  const accountId = res.locals.token.id
  const calendar = req.file
  
  try {
    validateCalendar (calendar)

    const calendarString = convertCalendarBufferToString (calendar)
    const calendarData = convertCalendarStringToArray (calendarString)
    const calendarParsed = parseCalendar (calendarData)
        
    Promise.all(calendarParsed.map(async (item) => {
      return await saveCourses(item, accountId)
    }))
    .then(results => res.json(generateResponse(results)))
    .catch((err) => next(err))
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

const uploadCoursesHandler = [
  upload.single ("calendar"),
  handleUploadCourses
]

export default uploadCoursesHandler