import express from "express"
import accountRouter from "../controllers/account/accountRouter"
import authRouter from "../controllers/auth/authRouter"
import sessionRouter from "../controllers/session/sessionRouter"
import testRouter from "../controllers/test/testRouter"
import courseRouter from "../controllers/courses/coursesRouter"
import { verifyAuthorizationToken } from "../controllers/auth/helpers/verifyAuthorizationToken"
import spotifyRouter from "../controllers/spotify/spotifyRouter"
import facebookRouter from "../controllers/facebook/facebookRouter"
// import tokenRouter from "../controllers/token/"

import { 
  authRoutes, 
  accountRoutes, 
  coursesRoutes,
  sessionRoutes,
  testRoutes,
  spotifyRoutes,
  // tokenRoutes,
  facebookRoutes
} from "./routes"
const api = express()

api.use(accountRoutes, verifyAuthorizationToken, accountRouter)
api.use(coursesRoutes, verifyAuthorizationToken, courseRouter)

api.use(authRoutes, authRouter)
api.use(sessionRoutes, sessionRouter)
api.use(spotifyRoutes, spotifyRouter)
api.use(facebookRoutes, facebookRouter)
// api.use(tokenRoutes, verifyAuthorizationToken, tokenRouter)

if (process.env.NODE_ENV === "development") {
  api.use(testRoutes, testRouter)
}

export default api