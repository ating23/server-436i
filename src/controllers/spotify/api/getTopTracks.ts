import Axios from "axios"
import { URL } from "url"
import { TrackInterface, ArtistInterface, SpotifyTracksInterface } from "./types/spotifyTypes";
import { generateArtistItem, generateTrackItem } from "./helpers/spotifyHelpers";

const SPOTIFY_BASE_URL = new URL("https://api.spotify.com/v1/me/top/tracks")
const LIMIT = 50;
SPOTIFY_BASE_URL.searchParams.set('limit', LIMIT.toString());

export default async function getTopTracks (accountId: string, accessToken: string): Promise<SpotifyTracksInterface> {
  try {
    const response = await Axios.get (`${SPOTIFY_BASE_URL}`, {
      headers: { "Authorization": `Bearer ${accessToken} `}
    })

    if (response.data.length <= 0) {
      // next(some_error_here)
      throw new Error("Response from Spotify API was empty.")
    } else {
      const tracks: Array<TrackInterface> = []

      response.data.items.forEach((track: Record<string, any>) => {
        const trackArtists: Array<ArtistInterface> = []
        track.artists.forEach((element: Record<string, any>) => {
          const artist = generateArtistItem(element)
          trackArtists.push(artist)
        });

        const x = generateTrackItem(track, trackArtists);
        tracks.push(x);
      });

      const ret = {
        accountId: accountId,
        tracks: tracks
      }
      return ret;
    }
  } catch(err) {
    throw new Error(err)
  }
}