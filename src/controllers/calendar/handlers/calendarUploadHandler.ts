import { Request, Response, NextFunction } from "express"
import multer from "multer"
import Logger from "../../../errors/Logger"
import { 
  convertCalendarBufferToString, 
  convertCalendarStringToArray, 
  generateCalendarMongoDocument, 
  validateCalendar 
} from "../helpers/uploadCalendarHelpers"
import CourseModel, { CourseDocument } from "../../../db/models/Course.model"
import parseCalendar from "../helpers/parseCalendar"
import { ClassItem } from "../helpers/calendarTypes"

const accountId = "1"

const upload = multer()


function writeCoursesToDB(): CourseDocument[] {

  return [];
}

async function handleCalendarUpload (req: Request, res: Response, next: NextFunction): Promise<void> {
  // const accountId = res.locals.token.accountId
  const calendar = req.file
  
  try {
    validateCalendar (calendar)

    const calendarString = convertCalendarBufferToString (calendar)
    const calendarData = convertCalendarStringToArray (calendarString)
    const calendarParsed = parseCalendar (calendarData)
    // const courses = generateCalendarMongoDocuments (accountId, calendarParsed)

    // TODO: 
    // query if class exists
    // push student into list of students into that class
    // if class DNE
    // create new class and add student to list of students in the newly created class
    
    let coursesModified: CourseDocument[] = [];

    calendarParsed.forEach(async (courseToQuery: ClassItem) => {
      const query = {
        courseDept: courseToQuery.courseDept,
        courseNumber: courseToQuery.courseNumber,
        startDate: courseToQuery.startDate,
        endDate: courseToQuery.endDate
      }
      const existingClass = await CourseModel.findOne(query)
      if (existingClass) {
        existingClass.students.push(accountId);
        existingClass.save();
        coursesModified.push(existingClass);
        Logger.Log(`course was found, updated existingClass's list of students ${existingClass.students}`);
      } else {
        const courseToWrite = generateCalendarMongoDocument(accountId, courseToQuery)
        courseToWrite.save();
        coursesModified.push(courseToWrite);
        Logger.Log(`Course was not found, wrote ${courseToWrite} to DB`);
      }
    })

    

    // const result = await CourseModel.insertMany (courses)
    Logger.Log ("Successfully inserted courses: ", coursesModified)
    res.json ({ coursesModified })
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