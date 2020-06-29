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
  sessionRoutes,
  testRoutes,
  calendarRoutes,
  coursesRoutes
} from "./routes"
import { verifyAuthorizationToken } from "../controllers/auth/helpers/verifyAuthorizationToken"

const api = express()

api.use(accountRoutes, verifyAuthorizationToken, accountRouter)
api.use(authRoutes, authRouter)
api.use(sessionRoutes, sessionRouter)
api.use(calendarRoutes, verifyAuthorizationToken, calendarRouter)
api.use (coursesRoutes, verifyAuthorizationToken, courseRouter)

if (process.env.NODE_ENV === "development") {
  api.use(testRoutes, testRouter)
}

export default api