import { Request, Response } from "express"

export default function connectFacebookHandler (req: Request, res: Response,): Response {
  const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body',
        })
    }
  
  //TODO: FB data
  return res.status(200).json({
    success: false,
    error: 'You must provide a message',
})
}