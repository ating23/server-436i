import Axios from "axios"
import Logger from "../../../errors/Logger"

export default async function getTopTracks (accessToken: string): Promise<void> {
  try {
    const response = await Axios.get ("https://api.spotify.com/v1/me/top/tracks", {
      headers: { "Authorization": `Bearer ${accessToken} `}
    })

    Logger.Log (response)
  }
  catch (error) {
    Logger.Log (error)
  }
}