import express from "express"
import authorizeSpotifyHandler from "./handlers/authorizeSpotifyHandler"
import deauthorizeSpotifyHandler from "./handlers/deauthorizeSpotifyHandler"
import deleteSpotifyHandler from "./handlers/deleteSpotifyHandler"
import getTokenSpotifyHandler from "./handlers/getTokenSpotifyHandler"
import { 
  authorizeSpotifyRoute, 
  deauthorizeSpotifyRoute, 
  deleteSpotifyRoute, 
  getTokenSpotifyRoute
} from "../../api/routes"

const spotifyRouter = express.Router()

spotifyRouter.get(authorizeSpotifyRoute.relative, authorizeSpotifyHandler)
spotifyRouter.get(getTokenSpotifyRoute.relative, getTokenSpotifyHandler)
spotifyRouter.post(deauthorizeSpotifyRoute.relative, deauthorizeSpotifyHandler)
spotifyRouter.delete(deleteSpotifyRoute.relative, deleteSpotifyHandler)

export default spotifyRouter