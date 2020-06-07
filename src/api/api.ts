import express, { Request, Response } from "express"

import accountRouter from "../controllers/account/accountRouter"
import authRouter from "../controllers/auth/authRouter"
import sessionRouter from "../controllers/session/sessionRouter"

import { 
  authRoutes, 
  accountRoutes, 
  sessionRoutes
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

export default api