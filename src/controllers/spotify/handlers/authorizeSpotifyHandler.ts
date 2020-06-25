/* eslint-disable @typescript-eslint/camelcase */
import { Request, Response, NextFunction } from "express"
import querystring from "querystring"
import { getTokenSpotifyRoute } from "../../../api/routes"
import { spotifyScope } from "../spotifyScope"
import Logger from "../../../errors/Logger"

function getRedirectURI (): string {
  const { NODE_ENV } = process.env 
  let uri
  if (NODE_ENV === "development") 
    uri = `http://localhost:${process.env.PORT}${getTokenSpotifyRoute.url}`
  else 
    uri = `https://api.educonnections.ca${getTokenSpotifyRoute.url}`
  return uri
}

export default function authorizeSpotifyHandler (
  req: Request, 
  res: Response, 
  next: NextFunction
): void {
  Logger.Log ("Hit endpoint!")
  console.log ("URI: ", getRedirectURI ())
  return res.redirect (`https://accounts.spotify.com/authorize?${querystring.stringify({
    client_id: process.env.SPOTIFY_CLIENT_ID,
    response_type: "code",
    redirect_uri: getRedirectURI (),
    scope: spotifyScope
  })}`)

}