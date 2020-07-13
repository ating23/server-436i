import Axios from "axios"
import Logger from "../../../errors/Logger"
import { URL } from "url";
import { SpotifyArtistInterface, ArtistInterface } from "./types/spotifyTypes";
import { generateArtistItem, generateSpotifyArtistInterface, validateArtistsAndTracksResponse } from "./helpers/spotifyHelpers";

const SPOTIFY_BASE_URL = new URL("https://api.spotify.com/v1/me/top/artists")
const LIMIT = 10;
SPOTIFY_BASE_URL.searchParams.set('limit', LIMIT.toString());

export default async function getTopArtists (accountId: string, accessToken: string): Promise<SpotifyArtistInterface> {

  // eslint-disable-next-line no-useless-catch
  try {
    const response = await Axios.get (`${SPOTIFY_BASE_URL}`, {
      headers: { "Authorization": `Bearer ${accessToken} `}
    })

    validateArtistsAndTracksResponse(response)

    const artists: Array<ArtistInterface> = []
    let genres: Array<string> = []

    response.data.items.forEach((element: Record<string, any>) => {
      artists.push(generateArtistItem(element))
      genres = [...genres, ...element.genres]
    });
    
    const x: SpotifyArtistInterface = generateSpotifyArtistInterface(accountId, artists, genres)
    return x;
    
  } catch (error) {
    if (error.isAxiosError) {
      if (error.response?.status === 401) {
        throw new Error("Spotify Bearer Token expired or invalid")
      } else if (error.response?.status >= 500) {
        throw new Error("Spotify API returned 500, it may be down.")
      } else {
        throw error
      }
    } else {
      throw error
    }
  }
}