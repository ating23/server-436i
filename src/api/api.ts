import express from "express"
import accountRouter from "../controllers/account/accountRouter"
import authRouter from "../controllers/auth/authRouter"
import sessionRouter from "../controllers/session/sessionRouter"
import testRouter from "../controllers/test/testRouter"
import courseRouter from "../controllers/courses/coursesRouter"
import spotifyRouter from "../controllers/spotify/spotifyRouter"
import { verifyAuthorizationToken } from "../controllers/auth/helpers/verifyAuthorizationToken"
import matchesRouter from "../controllers/matches/matchesRouter"
import { 
  authRoutes, 
  accountRoutes, 
  coursesRoutes,
  sessionRoutes,
  testRoutes,
  spotifyRoutes, 
  matchesRoutes
} from "./routes"

const api = express()

api.use(accountRoutes, verifyAuthorizationToken, accountRouter)
api.use(coursesRoutes, verifyAuthorizationToken, courseRouter)
api.use(matchesRoutes, verifyAuthorizationToken, matchesRouter)

api.use(authRoutes, authRouter)
api.use(sessionRoutes, sessionRouter)
api.use(spotifyRoutes, spotifyRouter)

if (process.env.NODE_ENV === "development") {
  api.use(testRoutes, testRouter)
}

export default api