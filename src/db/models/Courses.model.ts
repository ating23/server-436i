import { Document, model } from "mongoose"
import { coursesDec } from "../modelDeclarations"
import coursesSchema from "../schemas/coursesSchema"

export interface CoursesDocument extends Document {
  courseId: string;
  courseDept: string;
  courseNumber: string;
  courseSection: string;
  startDate: Date;
  endDate: Date;
  accounts: string[];
}

export default model<CoursesDocument>(coursesDec, coursesSchema)