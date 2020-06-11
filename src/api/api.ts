import express, { Request, Response } from "express"

import accountRouter from "../controllers/account/accountRouter"
import authRouter from "../controllers/auth/authRouter"
import sessionRouter from "../controllers/session/sessionRouter"
import calendarRouter from "../controllers/calendar/calendarRouter"

import { 
  authRoutes, 
  accountRoutes, 
  sessionRoutes,
  calendarRoutes
} from "./routes"
import { verifyAuthorizationToken } from "../controllers/auth/helpers/verifyAuthorizationToken"

const api = express()

api.get("/", async (req: Request, res: Response) => {
  console.log("Testing main route")
  res.json ({ received: true })
})

api.use(accountRoutes, verifyAuthorizationToken, accountRouter)
api.use(authRoutes, authRouter)
api.use(sessionRoutes, sessionRouter)
api.use(calendarRoutes, calendarRouter) // TODO: call verifyAuthorizationToken before allowing entry into /calendar

export default api