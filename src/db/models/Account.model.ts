import { Document, Schema, model } from "mongoose"
import { SpotifyAccountSchema } from "../schemas/spotifySchemas"
import { InstagramAccountSchema } from "../schemas/instagramSchemas"
import { FacebookAccountSchema } from "../schemas/facebookSchemas"
import { AccountModel } from "../models"

interface AccountDocument extends Document {
  id: number;
  name: string;
  email: string;
  password: string;
  facebook: typeof FacebookAccountSchema;
  instagram: typeof InstagramAccountSchema;
  spotify: typeof SpotifyAccountSchema;
}

const accountSchema: Schema = new Schema ({
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
  university: String,
  program: String,
  dateCreated: {
    type: Date,
    default: Date.now
  },
  facebook: FacebookAccountSchema,
  instagram: InstagramAccountSchema,
  spotify: SpotifyAccountSchema
})

export default model<AccountDocument>(AccountModel, accountSchema)