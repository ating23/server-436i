import { Schema, Document, model } from "mongoose"
import { SpotifyArtistsModel } from "../models"

interface SpotifyArtistsDocument extends Document {
  name: string;
}

export const spotifyArtistsSchema: Schema = new Schema ({
  name: String  
})

export default model<SpotifyArtistsDocument>(SpotifyArtistsModel, spotifyArtistsSchema)