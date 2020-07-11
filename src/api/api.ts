import express from "express"

import accountRouter from "../controllers/account/accountRouter"
import authRouter from "../controllers/auth/authRouter"
import sessionRouter from "../controllers/session/sessionRouter"
import testRouter from "../controllers/test/testRouter"
import calendarRouter from "../controllers/calendar/calendarRouter"
import courseRouter from "../controllers/courses/coursesRouter"

import { 
  authRoutes, 
  accountRoutes, 
  calendarRoutes,
  coursesRoutes,
  sessionRoutes,
  testRoutes,
  spotifyRoutes,
  tokenRoutes,
} from "./routes"
import { verifyAuthorizationToken } from "../controllers/auth/helpers/verifyAuthorizationToken"
import spotifyRouter from "../controllers/spotify/spotifyRouter"
import tokenRouter from "../controllers/token/tokenRouter"

const api = express()

api.use(accountRoutes, verifyAuthorizationToken, accountRouter)
api.use(authRoutes, authRouter)
api.use(calendarRoutes, verifyAuthorizationToken, calendarRouter)
api.use(coursesRoutes, verifyAuthorizationToken, courseRouter)
api.use(sessionRoutes, sessionRouter)
api.use(spotifyRoutes, spotifyRouter)
api.use(tokenRoutes, verifyAuthorizationToken, tokenRouter)

if (process.env.NODE_ENV === "development") {
  api.use(testRoutes, testRouter)
}

export default api