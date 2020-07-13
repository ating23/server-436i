import { Schema } from "mongoose"
import { coursesDec } from "../modelDeclarations"
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
  spotify: spotifyAccountSchema,
  courses: [{
    type: Schema.Types.ObjectId,
    ref: coursesDec
  }]
})

export default accountsSchema