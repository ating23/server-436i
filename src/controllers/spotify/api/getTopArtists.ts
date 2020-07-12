import Axios from "axios"
import Logger from "../../../errors/Logger"
import { URL } from "url";
import { SpotifyArtist } from "./types/spotifyTypes";
import SpotifyArtistsModel, {SpotifyArtistsDocument} from "../../../db/models/SpotifyArtists.model"

const SPOTIFY_BASE_URL = new URL("https://api.spotify.com/v1/me/top/artists")
const LIMIT = 5;
SPOTIFY_BASE_URL.searchParams.set('limit', LIMIT.toString());

function generateArtistItem (artist: Record<string, any>): SpotifyArtist {
  const artistItem: SpotifyArtist = {
    artistName: artist.name,
    "spotify_uuid": artist.id,
    href: artist.href,
    images: artist.images
  }
  return artistItem;
}

function generateDBItem(accountId: string, artists: Array<SpotifyArtist>, genres: Array<string>): SpotifyArtistsDocument {
  const toWrite = new SpotifyArtistsModel({
    accountId: accountId,
    artists: artists,
    genres: genres
  })
  return toWrite;
}

async function writeToDB(item: SpotifyArtistsDocument): Promise<SpotifyArtistsDocument> {
  const query = {
    accountId: item.accountId
  }

  console.log("the query is here: ", query)

  try {
    const existingSpotifyList = await SpotifyArtistsModel.findOne(query)
    if (existingSpotifyList) {
      Logger.Log(`SpotifyList for user ${item.accountId} already exists, their spotifyList was overwritten with ${item}`)
      const x = await item.save();
      return x
    } else {
      const x = await item.save()
      Logger.Log(`SpotifyList for user ${item.accountId} does not exist, created new SpotifyList and wrote ${item} to DB`)
      return x
    }
  } catch(err) {
    return Promise.reject(err)
  }
}

export default async function getTopArtists (accountId: string, accessToken: string): Promise<void> {

  try {
    const response = await Axios.get (`${SPOTIFY_BASE_URL}`, {
      headers: { "Authorization": `Bearer ${accessToken} `}
    })

    if (response.data.length <= 0) {
      // next(some_error_here)
    } else {
      const artists: Array<SpotifyArtist> = []
      let genres: Array<string> = []
      response.data.items.forEach((element: Record<string, any>) => {
        artists.push(generateArtistItem(element))
        genres = [...genres, ...element.genres]
      });
      
      const toWrite = generateDBItem(accountId, artists, genres)
      await writeToDB(toWrite)
    }

  }
  catch (error) {
    Logger.Log (error)
  }
}