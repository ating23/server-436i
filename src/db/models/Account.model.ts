import mongoose, { Document, Schema } from "mongoose"

interface AccountDocument extends Document {
  email: string;
  password: string;
  name: string;
  university: string;
  program: string;
  dateCreated: Date;
}

const accountSchema: Schema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  university: String,
  program: String,
  dateCreated: Date,
})

export default mongoose.model<AccountDocument>("Account", accountSchema)