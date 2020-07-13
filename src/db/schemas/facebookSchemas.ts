import { Schema } from "mongoose"

export const facebookAccountsSchema: Schema = new Schema({
  accessToken: String,
  refreshToken: String,
})