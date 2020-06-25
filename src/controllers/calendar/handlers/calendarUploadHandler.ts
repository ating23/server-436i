import { Request, Response, NextFunction } from "express"
import ical from "node-ical"
import multer from "multer"
import Logger from "../../../errors/Logger"
import isICS from "../helpers/uploadCalendarHelpers"
import { getEarliestStartDate, getLatestEndDate, generateHash, Classes, CalendarItem, ClassItem } from "../helpers/helper"
import CourseModel from "../../../db/models/Course.model"

/**
 * @Multer adds a `body` object and 
 *  a `file(s)` object to the `request` object
 * 
 * > the body contains the values of the text fields of the form
 * > req.file contains the fil uploaded via the form
 */


// Key	              Description	Note
// fieldname          Field name specified in the form	
// originalname       Name of the file on the user's computer	
// encoding           Encoding type of the file	
// mimetype           Mime type of the file	
// size         	    Size of the file in bytes	
// destination        The folder to which the file has been saved	DiskStorage
// filename           The name of the file within the destination	DiskStorage
// path         	    The full path to the uploaded file	DiskStorage
// buffer             A Buffer of the entire file	MemoryStorag

// ***
const accountId = 1
// ***

const upload = multer()

async function handleCalendarUpload (req: Request, res: Response, next: NextFunction): Promise<void> {
  const calendar = req.file
  if (!calendar || calendar === undefined) {
    return next (new Error ("Calendar upload was unsuccessful."))
  }

  if (!isICS (calendar.originalname)) {
    return next (new Error ("The file type that you uploaded is invalid."))
  }

  const calendarAsString = Buffer.from (calendar.buffer).toString ("utf8")
  // Logger.Log ("calendarAsString = ", calendarAsString)
  // Logger.Log ("-----------------------------------------------")

  const calendarData = Object.values (ical.sync.parseICS (calendarAsString))
  // Logger.Log ("calendarData = ", calendarData)
  // Logger.Log ("-----------------------------------------------")

  
  const accountCalendar: CalendarItem[] = []
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  calendarData.forEach ((item: any) => {
    if (item.type === "VEVENT") {
      const unparsedCourseName = item.summary.split (" ")
      const courseDept = unparsedCourseName[0]
      const courseNumber = unparsedCourseName[1]
      const courseSection = unparsedCourseName [2]
      
      Logger.Log ("courseDept: ", courseDept)
      Logger.Log ("courseNumber: ", courseNumber)
      Logger.Log ("courseSection: ", courseSection)

      let courseStart: string
      let courseEnd: string
      
      try {
        if (item["rrule"]) {
          const rrule = item["rrule"]
          if (rrule["origOptions"]) {
            const originOptions = rrule["origOptions"]
            courseStart = originOptions["dtstart"]
            courseEnd = originOptions["until"]
          } else {
            throw new Error ("Invalid calendar file.")
          }
        } else {
          throw new Error ("Invalid calendar file.")
        }
      }
      catch (error) {
        return next (error)
      }

      const courseStartDate = new Date (courseStart)
      const courseEndDate = new Date (courseEnd)
      Logger.Log (courseStartDate, courseEndDate)
      
      accountCalendar.push ({
        courseDept,
        courseNumber,
        courseSection,
        courseStartDate,
        courseEndDate
      })
    }
  })
  // Logger.Log (accountCalendar)
  
  const classes: Classes = {}
  accountCalendar.forEach (calendarClass => {
    const { courseDept, courseNumber, courseSection } = calendarClass
    const keyName = `${courseDept}-${courseNumber}-${courseSection}`
    if (classes[keyName]) {
      classes[keyName].push (calendarClass)
    } else {
      classes[keyName] = [calendarClass]
    }
  })
  // Logger.Log (classes)

  const classesResult: ClassItem[] = []
  Object.values (classes).forEach (courseArray => { 
    const classItem = courseArray[0]
    const { courseDept, courseNumber, courseSection } = classItem
    
    const earliestStart = getEarliestStartDate (courseArray)
    const latestEnd = getLatestEndDate (courseArray)
    const hash = generateHash (courseDept, courseNumber, courseSection, earliestStart, latestEnd)
    classesResult.push(new ClassItem (hash, classItem, earliestStart, latestEnd))
  })
  // Logger.Log (classesResult)
  
  /**
   * Add to MongoDB
   */
  const courses = classesResult.map (course => (
    new CourseModel ({
      courseId: course.classId,
      accountId,
      courseDept: course.courseDept,
      courseNumber: course.courseNumber,
      courseSection: course.courseSection,
      startDate: course.startDate,
      endDate: course.endDate
    })
  ))
  Logger.Log ("Courses ready for insert: ", courses)

  try {
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