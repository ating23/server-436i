import { generateCalendarMongoDocument } from "./uploadCalendarHelpers"
import { ClassItem } from "./calendarTypes"
import CoursesModel, { CoursesDocument } from "../../../../../db/models/Courses.model"
import Logger from "../../../../../errors/Logger"
import AccountsModel from "../../../../../db/models/Accounts.model"

export default async function saveCourses (courseToQuery: ClassItem, accountId: string): Promise<CoursesDocument> {
  const query = {
    courseDept: courseToQuery.courseDept,
    courseNumber: courseToQuery.courseNumber,
    courseSection: courseToQuery.courseSection,
    startDate: courseToQuery.startDate,
    endDate: courseToQuery.endDate
  }
  try {
    const existingClass = await CoursesModel.findOne(query)
    if (existingClass) {
      if (!existingClass.accounts.includes(accountId)) {
        // 1. Add accountId to courses[x].accounts([])
        existingClass.accounts.push(accountId)
        Logger.Log(`Course already exists, ${existingClass.courseDept}-${existingClass.courseNumber}-${existingClass.courseSection} list of students was incremented`)
        // 2. Add courseId to accounts[x].courses([])
        const account = await AccountsModel.findById(accountId)
        if (account) {
          Logger.Log("Adding existing course to accountId: ", accountId)
          account.courses.push(existingClass._id)
          account.save()
        }
      }
      existingClass.save()
      return Promise.resolve(existingClass)
    } 
    else {
      // 1. Create courses[x] and add accountId to courses[x].accounts([])
      const newCourse = generateCalendarMongoDocument (accountId, courseToQuery)
      newCourse.save()
      Logger.Log(`Course does not exist, created new course and wrote ${newCourse} to DB`)
      // 2. Add courseId to accounts[x].courses([])
      const account = await AccountsModel.findById(accountId)
        if (account) {
          Logger.Log("Adding new course to accountId: ", accountId)
          account.courses.push(newCourse._id)
          account.save()
        }
      return Promise.resolve(newCourse)
    }
  } catch(err) {
    return Promise.reject(err)
  }
}