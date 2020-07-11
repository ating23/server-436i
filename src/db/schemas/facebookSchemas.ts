import { Schema } from "mongoose"

export const FacebookAccountSchema: Schema = new Schema ({
  accessToken: String,
  refreshToken: String,
})