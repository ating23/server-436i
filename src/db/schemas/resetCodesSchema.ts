import { Schema } from "mongoose"
import { accountsDec } from "../modelDeclarations"

const resetCodesSchema: Schema = new Schema({
  accountId: {
    type: Schema.Types.ObjectId,
    ref: accountsDec,
    required: true,
    unique: true
  }
})

export default resetCodesSchema