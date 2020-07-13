export interface CourseApiResponse {
  _id: string;
  accounts: string[];
  courseDept: string;
  courseNumber: string;
  courseSection: string;
  startDate: Date;
  endDate: Date;
}