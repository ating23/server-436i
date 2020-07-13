import { Request, Response, NextFunction } from "express"
import Logger from "../../errors/Logger"
import getSpotifyUser from "../spotify/api/getSpotifyUser"
import getTopArtists from "../spotify/api/getTopArtists"
import getTopTracks from "../spotify/api/getTopTracks"
import { SpotifyArtistInterface, SpotifyUserInterface, SpotifyTracksInterface } from "../spotify/api/types/spotifyTypes"
import { SpotifyEmptyResultError, SpotifyServiceDownError, SpotifyBearerTokenError } from "../../errors/messages/ServicesErrorMessages"
import { generateDbItem, writeToDB } from "../spotify/api/helpers/spotifyHelpers"

function validateSpotifyData (spotifyUserData: SpotifyUserInterface, spotifyArtistData: SpotifyArtistInterface, spotifyTracksData: SpotifyTracksInterface): boolean {
  return spotifyUserData.accountId === spotifyArtistData.accountId && spotifyArtistData.accountId === spotifyTracksData.accountId && spotifyTracksData.accountId === spotifyUserData.accountId
}

export default async function fetch3rdPartyApi (req: Request, res: Response, next: NextFunction): Promise<void> {
  const accountId = res.locals.token.id

  const { service, accessToken, expiresIn, refreshToken } = req.body
  Logger.Log(service, accessToken, expiresIn, refreshToken)

  switch(service) {
    case "spotify": {
      try {
        const spotifyUserData: SpotifyUserInterface = await getSpotifyUser(accountId, accessToken);
        const spotifyArtistData: SpotifyArtistInterface = await getTopArtists(accountId, accessToken);
        const spotifyTracksData: SpotifyTracksInterface = await getTopTracks(accountId, accessToken);
        if (validateSpotifyData(spotifyUserData, spotifyArtistData, spotifyTracksData)) {
          // const x: UserSpotifyDataDocument = generateDbItem(accountId, spotifyUserData, spotifyArtistData, spotifyTracksData)
          try {
            // await writeToDB(x);
            res.status(204).send({})
          } catch (e) {
            res.status(400).send("Failed to write to DB");
          }
        }
        return
      } catch (e) {
        if (e.message === "Response from Spotify API was empty.") {
          next(SpotifyEmptyResultError)
        } else if (e.message === "Spotify API returned 500, it may be down.") {
          console.log("caught the malformed accessToken hereb");
          next(SpotifyServiceDownError)
        } else if (e.message === "Spotify Bearer Token expired or invalid") {
          next (SpotifyBearerTokenError)
        } else {
          res.status(400).send(e);
        }
        return
      }
    }
    case "facebook": {
      return
    }
    case "instagram": {
      return 
    }
  }

}