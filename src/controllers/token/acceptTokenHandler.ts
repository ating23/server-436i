import { Request, Response, NextFunction } from "express"
import Logger from "../../errors/Logger"

export default function acceptTokenHandler (req: Request, res: Response, next: NextFunction): void {
  const { service, accessToken, expiresAt, refreshToken } = req.body
  Logger.Log ("service, accessToken, expiresAt, refreshToken")
  Logger.Log (service, accessToken, expiresAt, refreshToken)
  res.json ({ success: true })
}