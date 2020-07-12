import Axios from "axios"
import Logger from "../../../errors/Logger"
import { SpotifyUserInterface } from "./types/spotifyTypes"

export default async function getSpotifyUser (accountId: string, accessToken: string): Promise<SpotifyUserInterface> {
  try {
    const response = await Axios.get ("https://api.spotify.com/v1/me", {
      headers: { "Authorization": `Bearer ${accessToken}`}
    })

    if (response.data) {
      const ret: SpotifyUserInterface = {
        displayName: response.data.display_name,
        uri: response.data.uri,
        href: response.data.href,
        images: response.data.images
      }
      return ret;

    } else {
      throw new Error("Response from Spotify API was empty.")
    }
  }
  catch (error) {
    throw new Error(error);
  }
}