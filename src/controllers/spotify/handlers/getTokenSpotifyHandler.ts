/* eslint-disable @typescript-eslint/camelcase */
import { Request, Response, NextFunction } from "express"
import Axios from "axios"
import querystring from "querystring"
import { getTokenSpotifyRoute, ClientRoute } from "../../../api/routes"
import Logger from "../../../errors/Logger"

export default async function getTokenSpotifyHandler (req: Request, res: Response, next: NextFunction): Promise<void> {
  const { code, error } = req.query
  Logger.Log ("Hit /callback")
  Logger.Log (getTokenSpotifyRoute.getFullRoute ())

  Logger.Log ("Error = ", error)
  Logger.Log ("Code = ", code)

  if (error !== undefined || !code) {
    return next (error)
  }
  const { SPOTIFY_CLIENT_ID, SPOTIFY_SECRET } = process.env

  try {
    const result = await Axios.post ("https://accounts.spotify.com/api/token", querystring.stringify({
      grant_type: "authorization_code",
      code: String(code),
      redirect_uri: getTokenSpotifyRoute.getFullRoute (),
      client_id: SPOTIFY_CLIENT_ID,
      client_secret: SPOTIFY_SECRET,
    }), 
    { 
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' } 
    })
    Logger.Log ("Result: ", result)

    res.redirect (ClientRoute)
    return 
  }
  catch (error) {
    Logger.Log("???????????????????????????????????????????????????//")
    Logger.Log(error)
    Logger.Log("???????????????????????????????????????????????????//")
    return next (error) 
  }
}