import Logger from "../../../errors/Logger"
import { generateCalendarMongoDocument } from "./uploadCalendarHelpers"
import CourseModel, { CoursesDocument } from "../../../db/models/Courses.model"
import { ClassItem } from "./calendarTypes"

export default async function writeCoursesToDB (courseToQuery: ClassItem, accountId: string): Promise<CoursesDocument> {
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
      if (!existingClass.accounts.includes(accountId)) {
        existingClass.accounts.push(accountId)
        Logger.Log(`Course already exists, ${existingClass.courseDept}-${existingClass.courseNumber}-${existingClass.courseSection} list of students was incremented`)
      }
      existingClass.save()
      return Promise.resolve(existingClass)
    } else {
      const newCourse = generateCalendarMongoDocument (accountId, courseToQuery)
      newCourse.save()
      Logger.Log(`Course does not exist, created new course and wrote ${newCourse} to DB`)
      return Promise.resolve(newCourse)
    }
  } catch(err) {
    return Promise.reject(err)
  }
}