import express from "express"

import accountRouter from "../controllers/account/accountRouter"
import authRouter from "../controllers/auth/authRouter"
import sessionRouter from "../controllers/session/sessionRouter"
import testRouter from "../controllers/test/testRouter"

import { 
  authRoutes, 
  accountRoutes, 
  sessionRoutes,
  testRoutes,
  spotifyRoutes,
  tokenRoutes
} from "./routes"
import { verifyAuthorizationToken } from "../controllers/auth/helpers/verifyAuthorizationToken"
import spotifyRouter from "../controllers/spotify/spotifyRouter"
import tokenRouter from "../controllers/token/tokenRouter"

const api = express()

api.use(accountRoutes, verifyAuthorizationToken, accountRouter)
api.use(tokenRoutes, verifyAuthorizationToken, tokenRouter)

api.use(authRoutes, authRouter)
api.use(sessionRoutes, sessionRouter)
api.use(spotifyRoutes, spotifyRouter)

if (process.env.NODE_ENV === "development") {
  api.use(testRoutes, testRouter)
}

export default api