import { MongooseDocument } from "mongoose";

export interface AccountApiReponse {
  uuid: string;
  name: string;
  email: string;
  spotifyVerified: boolean;
  spotify: Record<string, any>; // need to make a spotify type here? object has two keys (artists, tracks)
  facebookVerified: boolean;
  courses: string[];
}