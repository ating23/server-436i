import { Document, model } from "mongoose"
import { accountsDec } from "../modelDeclarations"
import accountSchema from "../schemas/accountSchema"

export interface AccountsDocument extends Document {
  id: string;
  name: string;
  email: string;
  password: string;
  program: string;
  dateCreated: Date;
  facebookVerified: boolean;
  spotifyVerified: boolean;
  facebook: {
    facebookId: string;
    name: string;
    email: string;
    hometown: string;
    profilePicURL: string;
    likes: string[];
  };
  spotify: {
    accessToken: string;
    refreshToken: string;
    spotifyId: string;
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
}

const AccountsModel = model<AccountsDocument>(accountsDec, accountSchema)
export default AccountsModel