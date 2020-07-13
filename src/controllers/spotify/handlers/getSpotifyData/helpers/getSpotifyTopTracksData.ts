import Axios from "axios"
import { SpotifyTracksData, SpotifyTracksResponse } from "../spotifyData.types"

async function getSpotifyTopTracksData (accessToken: string): Promise<SpotifyTracksData[]> {
  try {
    const { data }: SpotifyTracksResponse = await Axios.get ("https://api.spotify.com/v1/me/top/tracks", {
      headers: { "Authorization": `Bearer ${accessToken}` },
      params: { limit: 15 }
    })

    const tracksData: SpotifyTracksData[] = data.items.map(item => ({
      spotifyId: item.id,
      name: item.name,
      popularity: item.popularity,
      images: item.album.images,
      audioPreviewURL: item.preview_url,
      url: item.external_urls.spotify
    }))

    return tracksData
  } 
  catch(error) {
    if (error.isAxiosError) {
      if (error.res?.status === 401) {
        throw new Error("Spotify Bearer Token expired or invalid")
      } else if (error.res?.status >= 500) {
        throw new Error("Spotify API returned 500, it may be down.")
      } else {
        throw error
      }
    } else {
      throw error
    }
  }
  return []
}

export default getSpotifyTopTracksData