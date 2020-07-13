import { Schema } from "mongoose"
import { accountsDec } from "../modelDeclarations"

const coursesSchema: Schema = new Schema({
  // _id: ObjectId // automatically created by Mongoose
  courseId: {
    required: true,
    type: String
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
  accounts: [{
    type: Schema.Types.ObjectId,
    ref: accountsDec
  }]
})

coursesSchema.index ({ courseId: 1, accountId: 1 }, { unique: true })

export default coursesSchema