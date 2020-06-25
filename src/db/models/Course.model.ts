import mongoose, { Document, Schema } from "mongoose"

// https://medium.com/@tomanagle/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722
interface CourseDocument extends Document {
  courseId: string;
  accountId: number;
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
  accountId: {
    required: true,
    type: Number
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