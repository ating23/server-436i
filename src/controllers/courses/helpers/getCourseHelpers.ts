import { CourseApiResponse } from "./courseTypes"
import { CourseDocument } from "../../../db/models/Course.model";

export function generateCourseApiResponse(course: CourseDocument): CourseApiResponse {
  return {
    _id: course._id,
    students: course.students,
    courseDept: course.courseDept,
    courseNumber: course.courseNumber,
    courseSection: course.courseSection,
    startDate: course.startDate,
    endDate: course.endDate
  }
}