import { Document, model } from "mongoose"
import { spotifyTracksDec } from "../modelDeclarations"
import { spotifyTracksSchema } from "../schemas/spotifySchemas"

interface SpotifyArtist {
  spotifyId: string;
  name: string;
  url: string;
}

interface SpotifyTracksDocument extends Document {
  // Authentication
  spotifyId: string;
  accounts: string[];
  // Data
  name: string;
  popularity: number;
  image: {
    height: number;
    width: number;
    url: string;
  };
  audioPreviewURL: string;
  url: string;
  artists: SpotifyArtist[];
}

const SpotifyTracksModel = model<SpotifyTracksDocument>(spotifyTracksDec, spotifyTracksSchema)
export default SpotifyTracksModel