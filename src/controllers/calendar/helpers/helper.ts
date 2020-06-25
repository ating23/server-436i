import bcrypt from "bcryptjs"

export interface CalendarItem { 
  courseDept: string;
  courseNumber: string;
  courseSection: string;
  courseStartDate: Date;
  courseEndDate: Date;
}

export interface Classes {
  [key: string]: CalendarItem[];
}

export class ClassItem {
  classId: string
  courseDept: string
  courseNumber: string
  courseSection: string
  startDate: Date
  endDate: Date
  
  constructor (classId: string, classItem: CalendarItem, startDate: Date, endDate: Date) {
    const { courseDept, courseNumber, courseSection } = classItem
    this.courseDept = courseDept
    this.courseNumber = courseNumber
    this.courseSection = courseSection
    this.classId = classId
    this.startDate = startDate
    this.endDate = endDate
  }
}

function isEalier (first: Date, second: Date): boolean {
  return first < second
}

export function getEarliestStartDate (array: CalendarItem[]): Date {
  let earliestDate = array [0].courseStartDate
  for (let i = 1; i < array.length; i++) {
    if (isEalier (array[i].courseStartDate, earliestDate)) {
      earliestDate = array[i].courseStartDate
    }
  }
  return earliestDate
}

export function getLatestEndDate (array: CalendarItem[]): Date {
  let latestDate = array [0].courseEndDate
  for (let i = 1; i < array.length; i++) {
    if (isEalier (latestDate, array[i].courseEndDate)) {
      latestDate = array[i].courseEndDate
    }
  }
  return latestDate
}

export function generateHash (
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
