import { FacebookLike } from "./getAccountHandler";

export interface AccountApiReponse {
  accountId: string;
  name: string;
  email: string;
  spotifyVerified: boolean;
  spotify: Record<string, any>; // need to make a spotify type here? object has two keys (artists, tracks)
  facebookVerified: boolean;
  facebook: {
    facebookId: string;
    name: string;
    profilePicURL: string;
    hometown: string;
    email: string;
    likes: FacebookLike[];
  };
  courses: string[];
}