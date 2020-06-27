export interface CourseApiResponse {
  _id: string;
  students: [string];
  courseDept: string;
  courseNumber: string;
  courseSection: string;
  startDate: Date;
  endDate: Date;
}