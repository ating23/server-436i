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

