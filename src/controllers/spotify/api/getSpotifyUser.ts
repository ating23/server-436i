import Axios from "axios"
import Logger from "../../../errors/Logger"

export default async function getSpotifyUser (accountId: string, accessToken: string): Promise<void> {
  try {
    const response = await Axios.get ("https://api.spotify.com/v1/me", {
      headers: { "Authorization": `Bearer ${accessToken}`}
    })

    // NOT ALL THESE DEFINED IF USER HASN'T ENTERED THEM
    const {
      country,
      display_name: displayName,
      email,
      followers,
      href,
      id,
      images,
      product,
      type,
      uri
    } = response.data

    Logger.Log (response.data)

  }
  catch (error) {
    Logger.Log (error)
  }
}