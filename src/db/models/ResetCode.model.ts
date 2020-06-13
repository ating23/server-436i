import mongoose, { Document, Schema } from "mongoose"

interface ResetCodeDocument extends Document {
  accountId: string;
  code: number;
}

const resetCodeSchema: Schema = new mongoose.Schema ({
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:" Account",
    required: true
  }
})

export default mongoose.model<ResetCodeDocument> ("ResetCode", resetCodeSchema)