import Axios from "axios"
import Logger from "../../../errors/Logger"
import { URL } from "url";
import { SpotifyArtistInterface, ArtistInterface } from "./types/spotifyTypes";
import SpotifyArtistsModel, {SpotifyArtistsDocument} from "../../../db/models/SpotifyArtists.model"
import { generateArtistItem, generateSpotifyArtistInterface } from "./helpers/spotifyHelpers";

const SPOTIFY_BASE_URL = new URL("https://api.spotify.com/v1/me/top/artists")
const LIMIT = 5;
SPOTIFY_BASE_URL.searchParams.set('limit', LIMIT.toString());

// async function writeToDB(item: SpotifyArtistsDocument): Promise<SpotifyArtistsDocument> {
//   const query = {
//     accountId: item.accountId
//   }

//   console.log("the query is here: ", query)

//   try {
//     const existingSpotifyList = await SpotifyArtistsModel.findOne(query)
//     if (existingSpotifyList) {
//       Logger.Log(`SpotifyList for user ${item.accountId} already exists, their spotifyList was overwritten with ${item}`)
//       existingSpotifyList.overwrite(item)
//       const x = await existingSpotifyList.save();
//       return x
//     } else {
//       const x = await item.save()
//       Logger.Log(`SpotifyList for user ${item.accountId} does not exist, created new SpotifyList and wrote ${item} to DB`)
//       return x
//     }
//   } catch(err) {
//     return Promise.reject(err)
//   }
// }

export default async function getTopArtists (accountId: string, accessToken: string): Promise<SpotifyArtistInterface> {

  try {
    const response = await Axios.get (`${SPOTIFY_BASE_URL}`, {
      headers: { "Authorization": `Bearer ${accessToken} `}
    })

    if (response.data.length <= 0) {
      // next(some_error_here)
      throw new Error("Response from Spotify API was empty.")
    } else {
      const artists: Array<ArtistInterface> = []
      let genres: Array<string> = []
      
      response.data.items.forEach((element: Record<string, any>) => {
        artists.push(generateArtistItem(element))
        genres = [...genres, ...element.genres]
      });
      
      const x: SpotifyArtistInterface = generateSpotifyArtistInterface(accountId, artists, genres)
      console.log("==========================================================");
      console.log("THIS IS X RIGHT HERE BOYYYYY", x);
      return x;
    }
  }
  catch (error) {
    throw new Error (error)
  }
}