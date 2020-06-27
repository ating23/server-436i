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

export interface CalendarApiResponse {
  courseDept: string;
  courseNum: string;
  courseSection: string;
  uri: string;
}