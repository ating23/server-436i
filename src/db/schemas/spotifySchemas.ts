import { Schema } from "mongoose"
import { SpotifyArtistsModel, SpotifyTracksModel } from "../models"

const SpotifyImageSchema: Schema = new Schema ({
  height: Number,
  width: Number,
  url: {
    required: true,
    type: String
  }
})

export const SpotifyAccountSchema: Schema = new Schema ({
  accessToken: String,
  refreshToken: String,
  displayName: String,
  images: [SpotifyImageSchema],
  country: String,
  artists: [{
    type: Schema.Types.ObjectId,
    ref: SpotifyArtistsModel
  }],
  tracks: [{
    type: Schema.Types.ObjectId,
    ref: SpotifyTracksModel
  }],
})