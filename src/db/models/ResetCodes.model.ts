import { Document, model } from "mongoose"
import { resetCodesDec } from "../modelDeclarations"
import resetCodesSchema from "../schemas/resetCodesSchema"

interface ResetCodeDocument extends Document {
  accountId: number;
  code: number;
}

const RestCodesModel = model<ResetCodeDocument> (resetCodesDec, resetCodesSchema)
export default RestCodesModel