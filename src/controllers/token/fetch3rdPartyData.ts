import { Request, Response, NextFunction } from "express"
import Logger from "../../errors/Logger"
import getSpotifyUser from "../spotify/api/getSpotifyUser"
import getTopArtists from "../spotify/api/getTopArtists"
import getTopTracks from "../spotify/api/getTopTracks"
import { SpotifyArtistInterface, SpotifyUserInterface, TrackInterface, SpotifyTracksInterface } from "../spotify/api/types/spotifyTypes"



export default async function fetch3rdPartyApi (req: Request, res: Response, next: NextFunction): Promise<void> {
  const accountId = res.locals.token.id

  console.log("================================ HELLO")
  console.log ("Hit fetch3rdPartyApi")

  const { service, accessToken, expiresIn, refreshToken } = req.body
  Logger.Log(service, accessToken, expiresIn, refreshToken)

  switch(service) {
    case "spotify": {
      const spotifyUserData: SpotifyUserInterface = await getSpotifyUser(accountId, accessToken);
      const spotifyArtistData: SpotifyArtistInterface = await getTopArtists(accountId, accessToken);
      const spotifyTracksData: SpotifyTracksInterface = await getTopTracks(accountId, accessToken);
      res.status(200).send({spotifyUserData, spotifyArtistData, spotifyTracksData})
      return
    }
    case "facebook": {
      return
    }
    case "instagram": {
      return 
    }
  }

}