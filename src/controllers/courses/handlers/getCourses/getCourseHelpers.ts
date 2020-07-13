import { CoursesDocument } from "../../../../db/models/Courses.model"

interface CourseApiResponse {
  // Auth
  courseId: string;
  accounts: string[];
  // Data
  courseDept: string;
  courseNumber: string;
  courseSection: string;
  startDate: Date;
  endDate: Date;
}

export function generateResponse(course: CoursesDocument): CourseApiResponse {
  return {
    courseId: course._id,
    accounts: course.accounts,
    courseDept: course.courseDept,
    courseNumber: course.courseNumber,
    courseSection: course.courseSection,
    startDate: course.startDate,
    endDate: course.endDate
  }
}