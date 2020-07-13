import { Document, model } from "mongoose"
import { spotifyArtistsDec } from "../modelDeclarations"
import { spotifyArtistsSchema } from "../schemas/spotifySchemas"

interface SpotifyArtistsDocument extends Document {
  // Authentication
  spotifyId: string;
  accounts: string[];
  // Data
  name: string;
  popularity: number;
  followers: number;
  genres: string[];
  image: {
    height: number;
    width: number;
    url: string;
  };
  url: string;
}

const SpotifyArtistsModel = model<SpotifyArtistsDocument>(spotifyArtistsDec, spotifyArtistsSchema)
export default SpotifyArtistsModel