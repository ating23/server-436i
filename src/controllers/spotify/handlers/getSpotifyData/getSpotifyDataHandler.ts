import { NextFunction, Request, Response } from "express"
import Logger from "../../../../errors/Logger"
import getSpotifyUserData from "./helpers/getSpotifyUserData"
import getTopArtistsData from "./helpers/getSpotifyTopArtistsData"
import getTopTracksData from "./helpers/getSpotifyTopTracksData"
import SpotifyArtistsModel from "../../../../db/models/SpotifyArtists.model"
import AccountsModel from "../../../../db/models/Accounts.model"
import SpotifyTracksModel from "../../../../db/models/SpotifyTracks.model"
import { 
  SpotifyArtistsData, 
  SpotifyTracksData, 
  SpotifyUserData 
} from "./spotifyData.types"
import { 
  SpotifyBearerTokenError, 
  SpotifyEmptyResultError, 
  SpotifyServiceDownError 
} from "../../../../errors/messages/ServicesErrorMessages"
import statusCodes from "../../../../api/statusCodes"

export default async function getSpotifyUserDataHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { id: accountId } = res.locals.token
  const { accessToken, refreshToken } = req.body
  const artistsIds: string[] = []
  const tracksIds: string[] = []
  
  try {
    const artistsData: SpotifyArtistsData[] = await getTopArtistsData(accessToken)
    await Promise.all(artistsData.map(async function saveArtists(artist) {
      const account = await AccountsModel.findById(accountId)
      if (!account) {
        throw new Error ("An account was not found.")
      }
      
      const dbArtist = await SpotifyArtistsModel.findOne({ 
        spotifyId: artist.spotifyId 
      })
      if (!dbArtist) {
        const newArtist = new SpotifyArtistsModel({
          spotifyId: artist.spotifyId,
          accounts: [accountId],
          name: artist.name,
          popularity: artist.popularity,
          followers: artist.followers,
          genres: artist.genres,
          image: artist.images[0],
          url: artist.url,
        })
        const savedArtist = await newArtist.save()
        artistsIds.push(savedArtist._id)
      }
      // artists already exists : id
      else {
        if (!dbArtist.accounts.includes(accountId)) {
          dbArtist.accounts.push(accountId)
        }
        await dbArtist.save()
        artistsIds.push(dbArtist._id)
      }
    }))

    const tracksData: SpotifyTracksData[] = await getTopTracksData(accessToken)
    await Promise.all(tracksData.map(async function saveTracks(track) {
      const dbTrack = await SpotifyTracksModel.findOne({ 
        spotifyId: track.spotifyId 
      })
      if (!dbTrack) {
        Logger.Log("Creating new dbTrack...")
        const newTrack = new SpotifyTracksModel({
          spotifyId: track.spotifyId,
          accounts: [accountId],
          name: track.name,
          popularity: track.popularity,
          url: track.url,
          image: track.images[0],
          audioPreviewURL: track.audioPreviewURL,
          artists: [] // TODO
        })
        const savedTrack = await newTrack.save()
        tracksIds.push(savedTrack._id)
      }
      else {
        if (!dbTrack.accounts.includes(accountId)) {
          dbTrack.accounts.push(accountId)
        }
        await dbTrack.save()
        tracksIds.push(dbTrack._id)
      }
    }))

    const userData: SpotifyUserData = await getSpotifyUserData(accessToken)
    await AccountsModel.findByIdAndUpdate(accountId, {
      spotifyVerified: true,
      spotify: {
        accessToken: accessToken,
        refreshToken: refreshToken,
        spotifyId: userData.spotifyId,
        displayName: userData.displayName,
        email: userData.email,
        url: userData.url,
        followers: userData.followers,
        image: userData.images[0],
        country: userData.country,
        artists: artistsIds,
        tracks: tracksIds
      }
    })
    res.status(statusCodes.OK)
    return
  } 
  catch (error) {
    if (error.message === "Response from Spotify API was empty.") {
      return next(SpotifyEmptyResultError)
    } 
    else if (error.message === "Spotify API returned 500, it may be down.") {
      console.log("caught the malformed accessToken hereb")
      return next(SpotifyServiceDownError)
    } 
    else if (error.message === "Spotify Bearer Token expired or invalid") {
      return next (SpotifyBearerTokenError)
    } 
    else {
      res.status(400).send(error)
    }
    return
  }
}