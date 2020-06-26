/* eslint-disable @typescript-eslint/camelcase */
import { Request, Response, NextFunction } from "express"
import querystring from "querystring"
import { getTokenSpotifyRoute } from "../../../api/routes"
import { spotifyScope } from "../spotifyScope"
import Logger from "../../../errors/Logger"

export default function authorizeSpotifyHandler (req: Request, res: Response, next: NextFunction): void {
  Logger.Log ("Hit /authorize")
  console.log ("URI: ", getTokenSpotifyRoute.getFullRoute ())

  return res.redirect (`https://accounts.spotify.com/authorize?${querystring.stringify({
    client_id: process.env.SPOTIFY_CLIENT_ID,
    response_type: "code",
    redirect_uri: getTokenSpotifyRoute.getFullRoute (),
    scope: spotifyScope
  })}`)

}