import { MongooseDocument } from "mongoose";

export interface AccountApiReponse {
  accountId: string;
  name: string;
  email: string;
  spotifyVerified: boolean;
  spotify: Record<string, any>; // need to make a spotify type here? object has two keys (artists, tracks)
  facebookVerified: boolean;
  facebook: Record<string, any>;
  courses: string[];
}