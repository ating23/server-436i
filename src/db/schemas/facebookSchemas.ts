import { Schema } from "mongoose"
import { accountsDec, facebookLikesDec } from "../modelDeclarations"

export const facebookAccountsSchema: Schema = new Schema({
  facebookId: String,
  name: String,
  email: String,
  hometown: String,
  profilePicURL: String,
  likes: [{
    type: Schema.Types.ObjectId,
    ref: facebookLikesDec
  }]
})

export const facebookLikesSchema: Schema = new Schema({
  // Authentication
  facebookId: {
    type: String,
    index: true,
    unique: true
  },
  accounts: [{
    type: Schema.Types.ObjectId,
    ref: accountsDec
  }],
  // Data
  name: String
})