import { Schema } from "mongoose"
import { accountsDec, facebookLikesDec } from "../modelDeclarations"

export const facebookAccountsSchema: Schema = new Schema({
  userId: String,
  name: String,
  email: String,
  hometown: String,
  likes: [{
    type: Schema.Types.ObjectId,
    ref: facebookLikesDec
  }]
})

export const facebookLikesSchema: Schema = new Schema({
  // Authentication
  userId: {
    type: String,
    index: true,
    unique: true
  },
  accounts: [{
    type: Schema.Types.ObjectId,
    ref: accountsDec
  }],
  // Data
  like: String
})