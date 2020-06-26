import bcrypt from "bcryptjs"
import { CalendarItem, Classes, ClassItem } from "./calendarTypes"
import Logger from "../../../errors/Logger"

function isEalier (first: Date, second: Date): boolean {
  return first < second
}

function getEarliestStartDate (array: CalendarItem[]): Date {
  let earliestDate = array [0].courseStartDate
  for (let i = 1; i < array.length; i++) {
    if (isEalier (array[i].courseStartDate, earliestDate)) {
      earliestDate = array[i].courseStartDate
    }
  }
  return earliestDate
}

function getLatestEndDate (array: CalendarItem[]): Date {
  let latestDate = array [0].courseEndDate
  for (let i = 1; i < array.length; i++) {
    if (isEalier (latestDate, array[i].courseEndDate)) {
      latestDate = array[i].courseEndDate
    }
  }
  return latestDate
}

function generateHash (
  courseDept: string, 
  courseNumber: string, 
  courseSection: string, 
  startDate: Date, 
  endDate: Date
): string {
  const uniqueIdentifier = `${courseDept}-${courseNumber}-${courseSection}-${startDate}${endDate}`
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(uniqueIdentifier, salt)
}

function scrapeCalendarData (calendarData: object[]): CalendarItem[] {
  const rawCalendarArray: CalendarItem[] = []
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  calendarData.forEach ((item: any) => {
    if (item.type === "VEVENT") {
      const unparsedCourseName = item.summary.split (" ")
      const courseDept = unparsedCourseName[0]
      const courseNumber = unparsedCourseName[1]
      const courseSection = unparsedCourseName [2]
      
      let courseStart: string
      let courseEnd: string
      
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

      const courseStartDate = new Date (courseStart)
      const courseEndDate = new Date (courseEnd)
      Logger.Log (courseStartDate, courseEndDate)
      
      rawCalendarArray.push ({
        courseDept,
        courseNumber,
        courseSection,
        courseStartDate,
        courseEndDate
      })
    }
  })
  // Logger.Log (rawCalendarArray)
  return rawCalendarArray
}


function generateCourseHashMap (rawCalendarArray: CalendarItem[]): Classes {
  const classes: Classes = {}
  rawCalendarArray.forEach (calendarClass => {
    const { courseDept, courseNumber, courseSection } = calendarClass
    const keyName = `${courseDept}-${courseNumber}-${courseSection}`
    if (classes[keyName]) {
      classes[keyName].push (calendarClass)
    } else {
      classes[keyName] = [calendarClass]
    }
  })
  // Logger.Log (classes)
  return classes
}

function generateUniqueCourses (classes: Classes): ClassItem[] {
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
  return classesResult
}

export default function parseCalendar (calendarData: object[]): ClassItem[] {
  const rawCalendarArray = scrapeCalendarData (calendarData)
  const courseHashMap = generateCourseHashMap (rawCalendarArray)
  const uniqueClasses = generateUniqueCourses (courseHashMap)
  return uniqueClasses
}