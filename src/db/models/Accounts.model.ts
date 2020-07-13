import { Document, model } from "mongoose"
import { accountsDec } from "../modelDeclarations"
import accountSchema from "../schemas/accountSchema"
import { facebookAccountsSchema } from "../schemas/facebookSchemas"

interface AccountsDocument extends Document {
  id: string;
  name: string;
  email: string;
  password: string;
  facebook: typeof facebookAccountsSchema;
  spotify: {
    // Authentication
    accessToken: string;
    refreshToken: string;
    spotifyId: string;
    // Data
    displayName: string;
    email: string;
    url: string;
    followers: number;
    image: {
      height: number;
      width: number;
      url: string;
    };
    country: string;
    artists: string[]
    tracks: string[];
  };
  courses: string[];
}

const AccountsModel = model<AccountsDocument>(accountsDec, accountSchema)
export default AccountsModel