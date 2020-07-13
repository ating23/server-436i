import { Request, Response, NextFunction } from "express"
import Logger from "../../errors/Logger"
import getSpotifyUser from "../spotify/api/getSpotifyUser"
import getTopArtists from "../spotify/api/getTopArtists"
import getTopTracks from "../spotify/api/getTopTracks"
import { SpotifyArtistInterface, SpotifyUserInterface, SpotifyTracksInterface } from "../spotify/api/types/spotifyTypes"
import { SpotifyEmptyResultError, SpotifyServiceDownError, RequestToSpotifyError } from "../../errors/messages/ServicesErrorMessages"
import { generateDbItem, writeToDB } from "../spotify/api/helpers/spotifyHelpers"
import { UserSpotifyDataDocument } from "../../db/models/UserSpotifyData.model"

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
          const x: UserSpotifyDataDocument = generateDbItem(accountId, spotifyUserData, spotifyArtistData, spotifyTracksData)
          const y = await writeToDB(x);
          res.status(200).send(y)
          // write to DB
          // return 200 on successful write to DB
        }
        return
      } catch (e) {
        if (e.message === "Response from Spotify API was empty.") {
          next(SpotifyEmptyResultError)
        } else if (e.message === "Spotify API returned 500, it may be down.") {
          next(SpotifyServiceDownError)
        } else if (e.message === "Our request to Spotify API was malformed.") {
          next (RequestToSpotifyError)
        } else {
          console.log(e)
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