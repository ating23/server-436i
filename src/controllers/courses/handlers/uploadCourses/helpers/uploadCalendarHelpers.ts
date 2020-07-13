import ical from "node-ical"
import CoursesModel, { CoursesDocument } from "../../../../../db/models/Courses.model"
import { ClassItem } from "./calendarTypes"

function isICS (fileName: string): boolean {
  return fileName.split(".").pop() === "ics"
}

export function validateCalendar (calendar: Express.Multer.File): void {
  if (!calendar || calendar === undefined) {
    throw new Error ("Calendar upload was unsuccessful.")
  }

  if (!isICS (calendar.originalname)) {
    throw new Error ("The file type that you uploaded is invalid.")
  }
}

export function convertCalendarBufferToString (calendar: Express.Multer.File): string {
  return Buffer.from (calendar.buffer).toString ("utf8")
}

export function convertCalendarStringToArray (calendarString: string): object[] {
  return Object.values (ical.sync.parseICS (calendarString))
}

export function generateCalendarMongoDocument (accountId: string, classResult: ClassItem): CoursesDocument {
  return new CoursesModel({
    courseId: classResult.classId,
    accounts: [accountId],
    courseDept: classResult.courseDept,
    courseNumber: classResult.courseNumber,
    courseSection: classResult.courseSection,
    startDate: classResult.startDate,
    endDate: classResult.endDate
  })
}