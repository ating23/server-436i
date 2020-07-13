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

export default async function getSpotifyUserDataHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { id: accountId } = res.locals.token
  console.log("\n\nIn getSpotifyUserDataHandler = ", res.locals)
  const { accessToken, expiresIn, refreshToken } = req.body
  Logger.Log(
    "getSpotifyUserDataHandler: ", 
    accessToken, 
    expiresIn, refreshToken
  )
  
  try {
    const account = await AccountsModel.findById(accountId)
    if (!account) {
      throw new Error ("An account was not found.")
    }
    
    const artistsIds: string[] = []
    const tracksIds: string[] = []
    
    // account = await account.save()
    Logger.Log("Saved account with Spotify initialization")

    const artistsData: SpotifyArtistsData[] = await getTopArtistsData(accessToken)
    Logger.Log("artistsData: ", artistsData)
    
    await Promise.all(artistsData.map(async function saveArtists(artist) {
      const dbArtist = await SpotifyArtistsModel.findOne({ 
        spotifyId: artist.spotifyId 
      })
      Logger.Log("Existing dbArtist ? ", dbArtist)
      if (!dbArtist) {
        Logger.Log("Creating new dbArtist...")
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
        Logger.Log("Saved new Artist: ", savedArtist)
        artistsIds.push(savedArtist._id)
      }
      // artists already exists : id
      else {
        dbArtist.accounts.push(accountId)
        await dbArtist.save()
        Logger.Log("Saved existing Artist with new accountId")
        artistsIds.push(dbArtist.spotifyId)
      }
    }))

    const tracksData: SpotifyTracksData[] = await getTopTracksData(accessToken)
    Logger.Log("tracksData: ", tracksData)

    await Promise.all(tracksData.map(async function saveTracks(track) {
      const dbTrack = await SpotifyTracksModel.findOne({ 
        spotifyId: track.spotifyId 
      })
      Logger.Log("Existing dbTrack ? ", dbTrack)
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
        Logger.Log("Saved new Track: ", savedTrack)
        tracksIds.push(savedTrack._id)
      }
      else {
        dbTrack.accounts.push(accountId)
        await dbTrack.save()
        Logger.Log("Saved existing Track with new accountId")
        tracksIds.push(dbTrack.spotifyId)
      }
    }))

    console.log("_____________________________________________")
    console.log("After Promise.all from both : ", artistsIds)
    console.log("After Promise.all from both : ", tracksIds)
    console.log("_____________________________________________")

    const userData: SpotifyUserData = await getSpotifyUserData(accessToken)
    // Logger.Log("userData: ", userData)
    // const result = await account.save()
    account.overwrite({
      ...account,
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
    console.log("> Does this work?: ", account)
    await account.save()
    console.log("> Does this save?: ", account)
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