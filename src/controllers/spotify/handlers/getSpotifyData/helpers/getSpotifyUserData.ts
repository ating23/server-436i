import Axios from "axios"
import { SpotifyUserData, SpotifyUserResponse } from "../spotifyData.types"

async function getSpotifyUserData (accessToken: string): Promise<SpotifyUserData> {
  try {
    const { data }: SpotifyUserResponse = await Axios.get ("https://api.spotify.com/v1/me", {
      headers: { "Authorization": `Bearer ${accessToken}`}
    })
    if (!data) {
      throw new Error("Response from Spotify API was empty.")
    }

    const userData: SpotifyUserData = {
      country: data.country,
      displayName: data.display_name,
      email: data.email,
      url: data.external_urls.spotify,
      followers: data.followers.total,
      spotifyId: data.id,
      images: data.images
    }
    return userData
  }
  catch (error) {
    throw new Error(error)
  }
}

export default getSpotifyUserData