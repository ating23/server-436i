import { Schema, Document, model } from "mongoose"
import { SpotifyArtistsModel } from "../models"
import { SpotifyArtist } from "../../controllers/spotify/api/types/spotifyTypes"

export interface SpotifyArtistsDocument extends Document {
  accountId: string;
  artists: [SpotifyArtist];
  genres: [string];
}

export const spotifyArtistsSchema: Schema = new Schema ({
  accountId: {
    required: true,
    type: String
  },
  artists: {
    required: true,
    type: Array,
    of: Object
  },
  genres: {
    required: true,
    type: Array,
    of: String
  }
})

export default model<SpotifyArtistsDocument>(SpotifyArtistsModel, spotifyArtistsSchema)