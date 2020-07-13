import { Schema } from "mongoose"
import { accountsDec, spotifyArtistsDec, spotifyTracksDec } from "../modelDeclarations"

const SpotifyImageSchema: Schema = new Schema({
  height: Number,
  width: Number,
  url: String
})

export const spotifyAccountSchema: Schema = new Schema({
  // Authentication
  accessToken: String,
  refreshToken: String,
  spotifyId: String,
  // Data
  displayName: String,
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
  url: String,
  image: SpotifyImageSchema,
  audioPreviewURL: String,
  artists: [{
    spotifyId: String,
    name: String,
    url: String,
  }]
})