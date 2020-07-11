import { Document, Schema, model } from "mongoose"
import { ResetCodeModel, AccountModel } from "../models"

interface ResetCodeDocument extends Document {
  accountId: number;
  code: number;
}

const resetCodeSchema: Schema = new Schema ({
  accountId: {
    type: Schema.Types.ObjectId,
    ref: AccountModel,
    required: true,
    unique: true
  }
})

export default model<ResetCodeDocument> (ResetCodeModel, resetCodeSchema)