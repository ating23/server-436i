import { CoursesDocument } from "../../../../../db/models/Courses.model"

interface CalendarApiResponse {
  courseDept: string;
  courseNum: string;
  courseSection: string;
}

export default function generateResponse(courseDocuments: CoursesDocument[]): CalendarApiResponse[] {
  return courseDocuments.map (course => ({
    courseDept: course.courseDept,
    courseNum: course.courseNumber,
    courseSection: course.courseSection
  }))
}