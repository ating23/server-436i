/* eslint-disable @typescript-eslint/camelcase */
import { Request, Response } from "express"
import querystring from "querystring"
import { getTokenSpotifyRoute } from "../../../api/routes"
import { spotifyScope } from "../spotifyScope"
import { spotifyAuthorizeRoute } from "../spotifyRoutes"
import Logger from "../../../errors/Logger"

export default function authorizeSpotifyHandler (_req: Request, res: Response): void {
  const params = querystring.stringify({
    client_id: process.env.SPOTIFY_CLIENT_ID,
    response_type: "code",
    redirect_uri: getTokenSpotifyRoute.getFullRoute (),
    scope: spotifyScope
  })
  res.redirect (`${spotifyAuthorizeRoute}?${params}`)
}