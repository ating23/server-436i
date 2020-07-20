import { Document, model } from "mongoose"
import { facebookLikesDec } from "../modelDeclarations"
import { facebookLikesSchema } from "../schemas/facebookSchemas"

interface FacebookLikesDocument extends Document {
  // Authentication
  facebookId: string;
  accounts: string[];
  // Data
  like: string;
}

const FacebookLikesDocument = model<FacebookLikesDocument>(facebookLikesDec, facebookLikesSchema)
export default FacebookLikesDocument