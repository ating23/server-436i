import express, { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { verifySessionRoute } from "../../api/routes"
import statusCodes from "../../api/statusCodes"
import { SECRET_OR_PRIVATE_KEY } from "../../config/jwtConfig"
import Logger from "../../errors/Logger"

const sessionRouter = express.Router()

interface VerifyRouteRequest {
  token: string;
}

sessionRouter.post(verifySessionRoute.relative, (req: Request, res: Response, next: NextFunction) => {
  const { token }: VerifyRouteRequest = req.body
  Logger.Log ("Hit /verify/token: ", token)

  if(!token) {
    return next(new Error("No access token was provided."))
  }

  try {
    jwt.verify (token, SECRET_OR_PRIVATE_KEY)
    return res.sendStatus(statusCodes.ACCEPTED)
  }
  catch (error) {
    Logger.Log ("Bad decode: ", error)
    return res.status(statusCodes.BAD_REQUEST).send({ error })
  }
})

export default sessionRouter