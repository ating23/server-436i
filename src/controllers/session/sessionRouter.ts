import express, { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { verifySessionRoute } from "../../api/routes"
import statusCodes from "../../api/statusCodes"

import { SECRET_OR_PRIVATE_KEY } from "../../config/jwtConfig"

const sessionRouter = express.Router()

interface VerifyRouteRequest {
  token: string;
}

sessionRouter.post(verifySessionRoute.relative, (req: Request, res: Response, next: NextFunction) => {
  const { token }: VerifyRouteRequest = req.body
  if(!token) {
    return next(new Error("No access token was provided."))
  }

  const decoded = jwt.verify(token, SECRET_OR_PRIVATE_KEY)
  if(!decoded) {
    return res.status(statusCodes.BAD_REQUEST).send({ error: decoded })
  }

  return res.sendStatus(statusCodes.ACCEPTED)
})

export default sessionRouter