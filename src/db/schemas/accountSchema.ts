import { Schema } from "mongoose"
import { facebookAccountsSchema } from "./facebookSchemas"
import { spotifyAccountSchema } from "./spotifySchemas"

const accountsSchema: Schema = new Schema({
  // _id: ObjectId // automatically created by Mongoose
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  program: String,
  dateCreated: {
    type: Date,
    default: Date.now
  },
  facebook: facebookAccountsSchema,
  spotify: spotifyAccountSchema
})

export default accountsSchema