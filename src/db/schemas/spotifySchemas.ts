import { Schema } from "mongoose"
import { accountsDec } from "../modelDeclarations"

export const SpotifyImageSchema: Schema = new Schema({
  height: Number,
  width: Number,
  url: String
})

export const spotifyArtistsSchema: Schema = new Schema({
  // Authentication
  spotifyId: {
    type: String,
    index: true,
    unique: true
  },
  accounts: [{
    type: Schema.Types.ObjectId,
    ref: accountsDec
  }],
  // Data
  name: String,
  popularity: Number,
  followers: Number,
  genres: [String],
  image: SpotifyImageSchema,
  url: String
})

export const spotifyTracksSchema: Schema = new Schema({
  // Authentication
  spotifyId: {
    type: String,
    index: true,
    unique: true
  },
  accounts: [{
    type: Schema.Types.ObjectId,
    ref: accountsDec
  }],
  // Data
  name: String,
  popularity: Number,
  image: SpotifyImageSchema,
  audioPreviewURL: String,
  url: String,
  artists: [{
    spotifyId: String,
    name: String,
    url: String,
  }]
})