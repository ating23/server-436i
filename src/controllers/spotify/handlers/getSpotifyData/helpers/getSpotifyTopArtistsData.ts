import Axios from "axios"
import { SpotifyArtistsData, SpotifyArtistsResponse } from "../spotifyData.types"

async function getSpotifyTopArtistsData (accessToken: string): Promise<SpotifyArtistsData[]> {
  try {
    const { data }: SpotifyArtistsResponse = await Axios.get ("https://api.spotify.com/v1/me/top/artists", {
      headers: { "Authorization": `Bearer ${accessToken}` },
      params: { limit: 25 }
    })

    const artistsData: SpotifyArtistsData[] = data.items.map(item => ({
      spotifyId: item.id,
      name: item.name,
      popularity: item.popularity,
      followers: item.followers.total,
      genres: item.genres,
      images: item.images,
      url: item.external_urls.spotify
    }))

    return artistsData
  } 
  catch (error) {
    if (error.isAxiosError) {
      if (error.response?.status === 401) {
        throw new Error("Spotify Bearer Token expired or invalid")
      } 
      else if (error.response?.status >= 500) {
        throw new Error("Spotify API returned 500, it may be down.")
      }
    } 
    else {
      throw error
    }
  }
  return []
}

export default getSpotifyTopArtistsData