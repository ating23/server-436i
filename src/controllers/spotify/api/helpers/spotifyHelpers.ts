import { ArtistInterface, SpotifyArtistInterface, TrackInterface, SpotifyUserInterface, SpotifyTracksInterface } from "../types/spotifyTypes";
import { AxiosResponse, AxiosError } from "axios";
import SpotifyArtistsModel, {UserSpotifyDataDocument} from "../../../../db/models/UserSpotifyData.model"
import Logger from "../../../../errors/Logger";
import SpotifyDataModel from "../../../../db/models/UserSpotifyData.model"


export function generateArtistItem (artist: Record<string, any>): ArtistInterface {
  const artistItem: ArtistInterface = {
    artistName: artist.name,
    "spotify_uuid": artist.id,
    href: artist.href,
    images: artist.images
  }
  return artistItem;
}

export function generateSpotifyArtistInterface(accountId: string, artists: Array<ArtistInterface>, genres: Array<string>): SpotifyArtistInterface {
  const ret: SpotifyArtistInterface = {
    accountId: accountId,
    artists: artists,
    genres: genres
  }
  return ret;
}

export function generateTrackItem(track: Record<string, any>, artists: Array<ArtistInterface>): TrackInterface {
  const ret: TrackInterface = {
    artists: artists,
    "spotify_uuid": track.id,
    "song_name": track.name,
    href: track.href,
    "preview_url": track.preview_url,
    uri: track.uri
  }
  return ret;
}

export function validateArtistsAndTracksResponse(response: AxiosResponse<any>): void {
  if (response.data === undefined || response.data.length <= 0 || response.data.items.length <= 0) {
    throw new Error("Response from Spotify API was empty.")
  }
}

export function generateDbItem(accountId: string, spotifyUserData: SpotifyUserInterface, spotifyArtistData: SpotifyArtistInterface, spotifyTracksData: SpotifyTracksInterface): UserSpotifyDataDocument {
  const ret: UserSpotifyDataDocument = new SpotifyDataModel({
    accountId: accountId,
    favouriteArtists: spotifyArtistData.artists,
    genres: spotifyArtistData.genres,
    favouriteTracks: spotifyTracksData.tracks,
    user: spotifyUserData
  })
  return ret;
}

export async function writeToDB(item: UserSpotifyDataDocument): Promise<UserSpotifyDataDocument> {
  const query = {
    accountId: item.accountId
  }

  console.log("the query is here: ", query)

  // eslint-disable-next-line no-useless-catch
  try {
    const existingSpotifyList = await SpotifyArtistsModel.findOne(query)
    if (existingSpotifyList) {
      Logger.Log(`Spotify data for user ${item.accountId} already exists, their Spotify data was overwritten with ${item}`)
      existingSpotifyList.overwrite(item)
      const x = await existingSpotifyList.save();
      return x
    } else {
      const x = await item.save()
      Logger.Log(`Spotify data for user ${item.accountId} does not exist, created a new document and wrote ${item} to DB`)
      return x
    }
  } catch(err) {
    throw err
  }
}