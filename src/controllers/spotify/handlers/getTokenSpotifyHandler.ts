/* eslint-disable @typescript-eslint/camelcase */
import { Request, Response, NextFunction } from "express"
import Axios from "axios"
import querystring from "querystring"
import { getTokenSpotifyRoute, ClientRoute } from "../../../api/routes"
import Logger from "../../../errors/Logger"

const { SPOTIFY_CLIENT_ID, SPOTIFY_SECRET } = process.env

export default async function getTokenSpotifyHandler (req: Request, res: Response, next: NextFunction): Promise<void> {
  const { code, error } = req.query

  if (error !== undefined || !code) {
    return next (error)
  }

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
    // Logger.Log ("Result: ", result)

    const { 
      access_token: accessToken,
      token_type: tokenType,
      expires_in: expiresIn,
      refresh_token: refreshToken
    } = result.data

    Logger.Log (accessToken, tokenType, expiresIn, refreshToken)
    
    const params = querystring.stringify({
      service: "spotify",
      accessToken,
      expiresIn,
      refreshToken
    })
    const route = `${ClientRoute}/api?${params}`
    Logger.Log ("Redirecting to: ", route)
    res.redirect (route)
    return 
  }
  catch (error) {
    return next (error) 
  }
}