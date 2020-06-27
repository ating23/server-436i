import express from "express"

import accountRouter from "../controllers/account/accountRouter"
import authRouter from "../controllers/auth/authRouter"
import sessionRouter from "../controllers/session/sessionRouter"
import testRouter from "../controllers/test/testRouter"
import calendarRouter from "../controllers/calendar/calendarRouter"
import courseRouter from "../controllers/course/courseRouter"

import { 
  authRoutes, 
  accountRoutes, 
  sessionRoutes,
  testRoutes,
  calendarRoutes,
  courseRoutes
} from "./routes"
import { verifyAuthorizationToken } from "../controllers/auth/helpers/verifyAuthorizationToken"

const api = express()

api.use(accountRoutes, verifyAuthorizationToken, accountRouter)
api.use(authRoutes, authRouter)
// api.use(sessionRoutes, sessionRouter)
api.use(testRoutes, testRouter)
api.use(sessionRoutes, sessionRouter)
api.use(
  calendarRoutes, 
  verifyAuthorizationToken, 
  calendarRouter
)
api.use (courseRoutes, courseRouter) // TODO: missing verifyAuthorizationToken

export default api