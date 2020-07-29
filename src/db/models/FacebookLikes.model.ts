import { Document, model } from "mongoose"
import { facebookLikesDec } from "../modelDeclarations"
import { facebookLikesSchema } from "../schemas/facebookSchemas"

export interface FacebookLikesDocument extends Document {
  facebookId: string;
  accounts: string[];
  name: string;
}

const FacebookLikesModel = model<FacebookLikesDocument>(facebookLikesDec, facebookLikesSchema)
export default FacebookLikesModel