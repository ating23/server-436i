import { Request, Response, NextFunction } from "express"
import Logger from "../../errors/Logger"
import getSpotifyUser from "../spotify/api/getSpotifyUser"
import getTopArtists from "../spotify/api/getTopArtists"
import getTopTracks from "../spotify/api/getTopTracks"

export default async function fetch3rdPartyApi (req: Request, res: Response, next: NextFunction): Promise<void> {
  const accountId = res.locals.token.id

  console.log("================================ HELLO")
  console.log ("Hit fetch3rdPartyApi")

  const { service, accessToken, expiresAt, refreshToken } = req.body
  switch(service) {
    case "spotify":
      await getSpotifyUser(accountId, accessToken);
      await getTopArtists(accountId, accessToken);
      await getTopTracks(accountId, accessToken);
  }

}