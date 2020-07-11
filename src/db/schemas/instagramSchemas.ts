import { Schema } from "mongoose"

export const InstagramAccountSchema: Schema = new Schema ({
  accessToken: String,
  refreshToken: String
})