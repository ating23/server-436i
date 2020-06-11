import express from "express"

import accountRouter from "../controllers/account/accountRouter"
import authRouter from "../controllers/auth/authRouter"
import sessionRouter from "../controllers/session/sessionRouter"
import testRouter from "../controllers/test/testRouter"
import calendarRouter from "../controllers/calendar/calendarRouter"

import { 
  authRoutes, 
  accountRoutes, 
  sessionRoutes,
  testRoutes,
  calendarRoutes
} from "./routes"
import { verifyAuthorizationToken } from "../controllers/auth/helpers/verifyAuthorizationToken"

const api = express()

api.use(accountRoutes, verifyAuthorizationToken, accountRouter)
api.use(authRoutes, authRouter)
// api.use(sessionRoutes, sessionRouter)
api.use(testRoutes, testRouter)
api.use(sessionRoutes, sessionRouter)
api.use(calendarRoutes, calendarRouter) // TODO: call verifyAuthorizationToken before allowing entry into /calendar

export default api