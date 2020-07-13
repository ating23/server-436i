import { Document, model, Schema } from "mongoose"
import { accountsDec } from "../modelDeclarations"
import accountSchema from "../schemas/accountSchema"
import { facebookAccountsSchema } from "../schemas/facebookSchemas"
import { spotifyAccountSchema } from "../schemas/spotifySchemas"

interface AccountsDocument extends Document {
  id: string;
  name: string;
  email: string;
  password: string;
  facebook: typeof facebookAccountsSchema;
  spotify: typeof spotifyAccountSchema;
  courses: string[];
}

const AccountsModel = model<AccountsDocument>(accountsDec, accountSchema)
export default AccountsModel