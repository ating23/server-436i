import { Document, model } from "mongoose"
import { facebookDec } from "../modelDeclarations"
import { facebookAccountsSchema } from "../schemas/facebookSchemas"

interface FacebookAccountsDocument extends Document {
  // Authentication
  accessToken: string;
  refreshToken: string;
  accounts: string[];
  // Data
  // ...
}

const FacebookAccountsModel = model<FacebookAccountsDocument>(facebookDec, facebookAccountsSchema)
export default FacebookAccountsModel