import Axios from "axios"
import { URL } from "url"
import { TrackInterface, ArtistInterface, SpotifyTracksInterface } from "./types/spotifyTypes";
import { generateArtistItem, generateTrackItem, validateArtistsAndTracksResponse } from "./helpers/spotifyHelpers";

const SPOTIFY_BASE_URL = new URL("https://api.spotify.com/v1/me/top/tracks")
const LIMIT = 15;
SPOTIFY_BASE_URL.searchParams.set('limit', LIMIT.toString());

export default async function getTopTracks (accountId: string, accessToken: string): Promise<SpotifyTracksInterface> {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await Axios.get (`${SPOTIFY_BASE_URL}`, {
      headers: { "Authorization": `Bearer ${accessToken} `}
    })

    validateArtistsAndTracksResponse(response)
 
    const tracks: Array<TrackInterface> = []

    response.data.items.forEach((track: Record<string, any>) => {
      const trackArtists: Array<ArtistInterface> = []
      track.artists.forEach((element: Record<string, any>) => {
        const artist = generateArtistItem(element)
        trackArtists.push(artist)
      });

      const x: TrackInterface = generateTrackItem(track, trackArtists);
      tracks.push(x);
    });

    const ret = {
      accountId: accountId,
      tracks: tracks
    }
    return ret
    
  } catch(err) {
    if (err.isAxiosError) {
      if (err.response?.status === 401) {
        throw new Error("Spotify Bearer Token expired or invalid")
      } else if (err.response?.status >= 500) {
        throw new Error("Spotify API returned 500, it may be down.")
      } else {
        throw err
      }
    } else {
      throw err
    }
  }
}