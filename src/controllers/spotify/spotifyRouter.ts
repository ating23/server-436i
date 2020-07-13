import express from "express"
import authorizeSpotifyHandler from "./handlers/authorizeSpotifyHandler"
import deauthorizeSpotifyHandler from "./handlers/deauthorizeSpotifyHandler"
import deleteSpotifyHandler from "./handlers/deleteSpotifyHandler"
import getTokenSpotifyHandler from "./handlers/getTokenSpotifyHandler"
import getSpotifyDataHandler from "./handlers/getSpotifyData/getSpotifyDataHandler"
import { 
  authorizeSpotifyRoute, 
  deauthorizeSpotifyRoute, 
  deleteSpotifyRoute, 
  getSpotifyDataRoute, 
  getTokenSpotifyRoute
} from "../../api/routes"
import { verifyAuthorizationToken } from "../auth/helpers/verifyAuthorizationToken"

const spotifyRouter = express.Router()

spotifyRouter.get(authorizeSpotifyRoute.relative, authorizeSpotifyHandler)
spotifyRouter.get(getTokenSpotifyRoute.relative, getTokenSpotifyHandler)
spotifyRouter.post(
  getSpotifyDataRoute.relative, 
  verifyAuthorizationToken, 
  getSpotifyDataHandler
)
spotifyRouter.post(deauthorizeSpotifyRoute.relative, deauthorizeSpotifyHandler)
spotifyRouter.delete(deleteSpotifyRoute.relative, deleteSpotifyHandler)

export default spotifyRouter