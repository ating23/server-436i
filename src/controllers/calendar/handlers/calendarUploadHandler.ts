import { Request, Response, NextFunction } from "express"
import multer from "multer"
import Logger from "../../../errors/Logger"
import { 
  convertCalendarBufferToString, 
  convertCalendarStringToArray, 
  generateCalendarMongoDocument, 
  validateCalendar, 
  generateCalendarApiResponse
} from "../helpers/uploadCalendarHelpers"
import CourseModel, { CourseDocument } from "../../../db/models/Course.model"
import parseCalendar from "../helpers/parseCalendar"
import { ClassItem } from "../helpers/calendarTypes"
import { CalendarNullUploadError, CalendarUploadFileTypeError } from "../../../errors/messages/ServicesErrorMessages"

// const accountId = "1"

const upload = multer()

async function writeCourseToDB(courseToQuery: ClassItem, accountId: string): Promise<CourseDocument> {
  const query = {
    courseDept: courseToQuery.courseDept,
    courseNumber: courseToQuery.courseNumber,
    courseSection: courseToQuery.courseSection,
    startDate: courseToQuery.startDate,
    endDate: courseToQuery.endDate
  }
  try {
    const existingClass = await CourseModel.findOne(query)
    if (existingClass) {
      if (!existingClass.students.includes(accountId)) {
        existingClass.students.push(accountId);
        Logger.Log(`Course already exists, ${existingClass.courseDept}-${existingClass.courseNumber}-${existingClass.courseSection} list of students was incremented`);
      }
      existingClass.save();
      return Promise.resolve(existingClass);
    } else {
      const newCourse = generateCalendarMongoDocument(accountId, courseToQuery)
      newCourse.save();
      Logger.Log(`Course does not exist, created new course and wrote ${newCourse} to DB`);
      return Promise.resolve(newCourse);
    }
  } catch(err) {
    return Promise.reject(err);
  }
}

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
      return await writeCourseToDB(item, accountId);
    })).then((results => {

      res.json (generateCalendarApiResponse(results));
    })).catch((err) => {
      return next(err);
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