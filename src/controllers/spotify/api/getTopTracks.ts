import Axios from "axios"
import Logger from "../../../errors/Logger"
import { URL } from "url"

const SPOTIFY_BASE_URL = new URL("https://api.spotify.com/v1/me/top/tracks")
SPOTIFY_BASE_URL.searchParams.set('limit', '5');

export default async function getTopTracks (accountId: string, accessToken: string): Promise<void> {
  console.log(`${SPOTIFY_BASE_URL}`)
  try {
    const response = await Axios.get (`${SPOTIFY_BASE_URL}`, {
      headers: { "Authorization": `Bearer ${accessToken} `}
    })
    Logger.Log ("==========================================")
    Logger.Log ("TOP TRACKS")
    Logger.Log (response.data)
  }
  catch (error) {
    Logger.Log (error)
  }
}