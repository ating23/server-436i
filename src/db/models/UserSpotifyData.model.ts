import { Schema, Document, model } from "mongoose"
import { SpotifyDataModel } from "../models"
import { SpotifyArtistInterface, SpotifyTracksInterface } from "../../controllers/spotify/api/types/spotifyTypes"

export interface UserSpotifyDataDocument extends Document {
  accountId: string;
  favouriteArtists: [SpotifyArtistInterface];
  genres: [string];
  favouriteTracks: [SpotifyTracksInterface];
  user: Record<string, any>;
}

export const userSpotifyDataSchema: Schema = new Schema ({
  accountId: {
    required: true,
    type: String
  },
  favouriteArtists: {
    required: true,
    type: Array,
    of: Object
  },
  genres: {
    required: true,
    type: Array,
    of: String
  },
  favouriteTracks: {
    required: true,
    type: Array,
    of: Object
  },
  user: {
    required: true,
    type: Object
  }
})

export default model<UserSpotifyDataDocument>(SpotifyDataModel, userSpotifyDataSchema)