import { Request, Response, NextFunction } from "express";
import AccountModel, {
  AccountsDocument,
} from "../../../db/models/Accounts.model";
import {
  NoAccountFoundError,
  SpotifyEmptyResultError,
} from "../../../errors/messages/ServicesErrorMessages";
import statusCodes from "../../../api/statusCodes";
import Logger from "../../../errors/Logger";
import { AccountApiReponse } from "./accountTypes";
import SpotifyArtistsModel from "../../../db/models/SpotifyArtists.model";
import SpotifyTracksModel from "../../../db/models/SpotifyTracks.model";
import { Types } from "mongoose";
import FacebookLikesModel, {
  FacebookLikesDocument,
} from "../../../db/models/FacebookLikes.model";

export interface FacebookLike {
  likeId: string;
  name: string;
}

function transformLikes(likes: FacebookLikesDocument[]): FacebookLike[] {
  const ret: FacebookLike[] = [];

  likes.forEach((like: FacebookLikesDocument) => {
    ret.push({
      likeId: like._id,
      name: like.name,
    });
  });

  return ret;
}

async function generateAccountApiResponse(
  account: AccountsDocument
): Promise<AccountApiReponse> {
  const artists = await SpotifyArtistsModel.find({
    _id: {
      $in: account.spotify.artists.map((artist) => Types.ObjectId(artist)),
    },
  });

  const tracks = await SpotifyTracksModel.find({
    _id: { $in: account.spotify.tracks.map((track) => Types.ObjectId(track)) },
  });

  const allLikes = await FacebookLikesModel.find({
    _id: { $in: account.facebook.likes.map((like) => Types.ObjectId(like)) },
  });
  const likes = transformLikes(allLikes);

  return {
    accountId: account.id,
    name: account.name,
    email: account.email,
    spotifyVerified: account.spotifyVerified,
    spotify: { ...account.spotify, artists, tracks },
    facebookVerified: account.facebookVerified,
    facebook: {
      facebookId: account.facebook.facebookId,
      name: account.facebook.name,
      profilePicURL: account.facebook.profilePicURL,
      email: account.facebook.email,
      hometown: account.facebook.hometown,
      likes,
    },
    courses: account.courses,
  };
}
export default async function getProfileHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { id } = res.locals.id;
  Logger.Log("Id: ", id);
  Logger.Log("YEET");
  try {
    const account = await AccountModel.findById(id);
    Logger.Log("Account: ", account);
    if (!account) {
      return next(NoAccountFoundError);
    }

    const ret = await generateAccountApiResponse(account);

    res.status(statusCodes.OK).json(ret);
    return;
  } catch (error) {
    return next(error);
  }
}
