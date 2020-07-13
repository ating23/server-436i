import { CourseApiResponse } from "./courseTypes"
import { CoursesDocument } from "../../../db/models/Courses.model";

export function generateCourseApiResponse(course: CoursesDocument): CourseApiResponse {
  return {
    _id: course._id,
    accounts: course.accounts,
    courseDept: course.courseDept,
    courseNumber: course.courseNumber,
    courseSection: course.courseSection,
    startDate: course.startDate,
    endDate: course.endDate
  }
}