import ical from "node-ical"
import CourseModel, { CourseDocument } from "../../../db/models/Course.model"
import { ClassItem, CalendarApiResponse } from "./calendarTypes"

// export async function checkClassExists (classCode: string): Promise<boolean> {
//   const existingClass = await ClassModel.findOne({classCode: classCode})
//   if (existingClass) {
//     return true
//   }
//   return false
// }

// export async function updateClassInDB (classCode: string, studentID: string): Promise<boolean> {
//   try {
//     const existingClass = await ClassModel.findOne({classCode: classCode})
//     existingClass?.students.push(studentID)
//     await existingClass?.save()
//     return Promise.resolve(true)
//   } 
//   catch (error) {
//     return Promise.reject(false)
//   }
// }

// export async function writeNewClassInDB (classCode: string, studentID: string): Promise<any> {
//   const students: [string] = [studentID]
//   const newClass = new ClassModel({classCode: classCode, students: students})

//   newClass.save((err, classCreated) => {
//     if (err) {
//       return Promise.reject({error: err})
//     }
//     console.log(classCreated)
//     return Promise.resolve({classCreated})
//   })
// }

const api = "https://api.educonnections.ca/course/";

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
  const x: CalendarApiResponse[] = [];

  for (const course of courseDocuments) {
    x.push({
      courseDept: course.courseDept,
      courseNum: course.courseNumber,
      courseSection: course.courseSection,
      uri: api + course._id
    });
  }
  
  return x;
}