import { Request, Response, NextFunction } from "express";
import AccountModel, { AccountsDocument } from "../../../db/models/Accounts.model";
import { NoAccountFoundError, SpotifyEmptyResultError } from "../../../errors/messages/ServicesErrorMessages";
import statusCodes from "../../../api/statusCodes";
import Logger from "../../../errors/Logger";
import { AccountApiReponse } from "./accountTypes";
import SpotifyArtistsModel from "../../../db/models/SpotifyArtists.model";
import SpotifyTracksModel from "../../../db/models/SpotifyTracks.model";
import { Types } from "mongoose";

async function generateAccountApiResponse(account: AccountsDocument): Promise<AccountApiReponse> {
  const artists = await SpotifyArtistsModel.find({
    _id: { $in: account.spotify.artists.map(artist => Types.ObjectId(artist)) }
  })

  const tracks = await SpotifyTracksModel.find({
    _id: { $in: account.spotify.tracks.map(track => Types.ObjectId(track)) }
  })

  return {
    accountId: account.id,
    name: account.name,
    email: account.email,
    spotifyVerified: account.spotifyVerified,
    spotify: {...account.spotify, artists, tracks},
    facebookVerified: account.facebookVerified,
    facebook: account.facebook,
    courses: account.courses
  }
}

export default async function getAccountHandler (req: Request, res: Response, next: NextFunction): Promise<void> {
  const { id } = res.locals.token
  Logger.Log ("Id: ", id)

  try {
    const account = await AccountModel.findById (id)
    Logger.Log ("Account: ", account)
    if (!account) {
      return next (NoAccountFoundError)
    }

    const ret = await generateAccountApiResponse(account);
    
    res.status(statusCodes.OK).json (ret)
    return
  }
  catch (error) {
    return next(error)
  }
}