import mongoose, { Document, Schema } from "mongoose"

interface ResetTokenDocument extends Document {
  accountId: string;
  token: number; 
}

const resetTokenSchema: Schema = new mongoose.Schema ({
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:" Account",
    required: true
  },
  token: mongoose.Types.ObjectId
})

export default mongoose.model<ResetTokenDocument> ("ResetToken", resetTokenSchema)