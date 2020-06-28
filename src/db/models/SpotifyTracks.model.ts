import { Schema, Document, model } from "mongoose"
import { SpotifyTracksModel } from "../models"

interface SpotifyTracksDocument extends Document {
  name: string;
}

export const spotifyTracksSchema: Schema = new Schema ({
  name: String
})

export default model<SpotifyTracksDocument>(SpotifyTracksModel, spotifyTracksSchema)