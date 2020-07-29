import { Schema } from "mongoose"
import { accountsDec } from "../modelDeclarations"

export const facebookLikesSchema: Schema = new Schema({
  facebookId: {
    type: String,
    index: true,
    unique: true
  },
  name: String,
  accounts: [{
    type: Schema.Types.ObjectId,
    ref: accountsDec
  }],
})