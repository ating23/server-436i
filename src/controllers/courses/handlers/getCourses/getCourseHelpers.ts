import { CoursesDocument } from "../../../../db/models/Courses.model"
import { Classmate } from "./getCoursesHandler"

interface CourseApiResponse {
  // Auth
  courseId: string;
  accounts: Classmate[];
  // Data
  courseDept: string;
  courseNumber: string;
  courseSection: string;
  startDate: Date;
  endDate: Date;
}

export function generateResponse(course: CoursesDocument, classmates: Classmate[]): CourseApiResponse {
  return {
    courseId: course._id,
    accounts: classmates,
    courseDept: course.courseDept,
    courseNumber: course.courseNumber,
    courseSection: course.courseSection,
    startDate: course.startDate,
    endDate: course.endDate
  }
}