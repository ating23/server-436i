import mongoose, { Document, Schema } from "mongoose"

// https://medium.com/@tomanagle/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722
interface ClassDocument extends Document {
  _id: number;
  classCode: string;
  students: [string];
}

const classSchema: Schema = new mongoose.Schema ({
  classCode: {
    type: String,
    required: true,
  },
    students: [String]
})

export default mongoose.model<ClassDocument>("Class", classSchema)