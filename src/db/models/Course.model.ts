import mongoose, { Document, Schema } from "mongoose"

// https://medium.com/@tomanagle/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722
export interface CourseDocument extends Document {
  courseId: string;
  students: [string];
  courseDept: string;
  courseNumber: string;
  courseSection: string;
  startDate: Date;
  endDate: Date;
}

const courseSchema: Schema = new mongoose.Schema ({
  courseId: {
    required: true,
    type: String
  },
  students: {
    required: true,
    type: Array,
    of: String
  },
  courseDept: {
    required: true,
    type: String
  },
  courseNumber: {
    required: true,
    type: String
  },
  courseSection: {
    required: true,
    type: String
  },
  startDate: {
    required: true,
    type: Date
  },
  endDate: {
    required: true,
    type: Date
  },
})

/**
 * Unique compound index on <courseId, accountId>
 */
courseSchema.index ({ courseId: 1, accountId: 1 }, { unique: true })

export default mongoose.model<CourseDocument>("Course", courseSchema)