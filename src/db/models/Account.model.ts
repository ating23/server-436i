import mongoose, { Document, Schema } from "mongoose"

// https://medium.com/@tomanagle/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722
interface AccountDocument extends Document {
  _id: number;
  email: string;
  password: string;
  name: string;
  university: string;
  program: string;
  dateCreated: Date;
}

const accountSchema: Schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  university: String,
  program: String,
  dateCreated: Date,
})

export default mongoose.model<AccountDocument>("Account", accountSchema)