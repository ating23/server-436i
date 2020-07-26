import { Schema } from "mongoose"
import { 
  coursesDec, 
  facebookLikesDec, 
  spotifyArtistsDec, 
  spotifyTracksDec 
} from "../modelDeclarations"
import { SpotifyImageSchema } from "./spotifySchemas"

const accountsSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  program: String,
  dateCreated: {
    type: Date,
    default: Date.now
  },
  // Flags
  facebookVerified: {
    type: Boolean,
    default: false,
    required: true
  },
  spotifyVerified: {
    type: Boolean,
    default: false,
    required: true
  },
  // End Flags
  facebook: {
    facebookId: String,
    name: String,
    email: String,
    hometown: String,
    profilePicURL: String,
    likes: [{
      type: Schema.Types.ObjectId,
      ref: facebookLikesDec
    }]
  },
  spotify: {
    accessToken: String,
    refreshToken: String,
    spotifyId: String,
    displayName: String,
    email: String,
    url: String,
    followers: Number,
    image: SpotifyImageSchema,
    country: String,
    artists: [{
      type: Schema.Types.ObjectId,
      ref: spotifyArtistsDec
    }],
    tracks: [{
      type: Schema.Types.ObjectId,
      ref: spotifyTracksDec
    }]
  },
  courses: [{
    type: Schema.Types.ObjectId,
    ref: coursesDec
  }]
})

export default accountsSchema