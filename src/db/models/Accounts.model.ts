import { Document, model } from "mongoose"
import { accountsDec } from "../modelDeclarations"
import accountSchema from "../schemas/accountSchema"
import { facebookAccountsSchema } from "../schemas/facebookSchemas"

export interface AccountsDocument extends Document {
  id: string;
  name: string;
  email: string;
  password: string;
  facebookVerified: boolean;
  spotifyVerified: boolean;
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
    artists: string[];
    tracks: string[];
  };
  courses: string[];
  // facebook: typeof facebookAccountsSchema;
  facebook: {
    facebookId: string;
    name: string;
    email: string;
    hometown: string;
    profilePicURL: string;
    likes: string[];
  };
}

const AccountsModel = model<AccountsDocument>(accountsDec, accountSchema)
export default AccountsModel