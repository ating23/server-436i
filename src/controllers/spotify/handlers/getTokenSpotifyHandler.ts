/* eslint-disable @typescript-eslint/camelcase */
import { Request, Response, NextFunction } from "express"
import Axios from "axios"
import { getTokenSpotifyRoute } from "../../../api/routes"

function getRedirectURI (): string {
  const { NODE_ENV } = process.env 
  let uri
  if (NODE_ENV === "development") 
    uri = `http://localhost:${process.env.PORT}/${getTokenSpotifyRoute.url}`
  else 
    uri = `https://api.educonnections.ca/${getTokenSpotifyRoute.url}`
  return uri
}

const redirect_uri = getRedirectURI ()
console.log ("redirect_uri: ", redirect_uri)

export default function getTokenSpotifyHandler (
  req: Request, 
  res: Response, 
  next: NextFunction
): void {
  // const code = req.query.code || null
  console.log (req.query)

  res.json ({ res: req.query })
  return 
  
  // const { SPOTIFY_CLIENT_ID, SPOTIFY_SECRET } = process.env

  // try {
  //   const result = await Axios.post ("https://accounts.spotify.com/api/token", {
  //     grant_type: "authorization_code",
  //     code,
  //     redirect_uri: 
  //     client_id: SPOTIFY_CLIENT_ID,
  //     client_secret: SPOTIFY_SECRET
  //   })
  // }
  // catch (error) {
  //   return next (error) 
  // }
}