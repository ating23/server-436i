import ical from "node-ical"
import CourseModel, { CourseDocument } from "../../../db/models/Course.model"
import { ClassItem, CalendarApiResponse } from "./calendarTypes"

const api = "https://api.educonnections.ca/course/"

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

export function generateCalendarMongoDocument (accountId: string, classResult: ClassItem): CourseDocument {
  return new CourseModel({
    courseId: classResult.classId,
    students: [accountId],
    courseDept: classResult.courseDept,
    courseNumber: classResult.courseNumber,
    courseSection: classResult.courseSection,
    startDate: classResult.startDate,
    endDate: classResult.endDate
  })
}

export function generateCalendarApiResponse (courseDocuments: CourseDocument[]): CalendarApiResponse[] {
  return courseDocuments.map (course => ({
    courseDept: course.courseDept,
    courseNum: course.courseNumber,
    courseSection: course.courseSection,
    uri: api + course._id
  }))
}