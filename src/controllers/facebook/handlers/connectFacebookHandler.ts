import { Request, Response } from "express"
import Axios from "axios"
import querystring from "querystring"

export default async function connectFacebookHandler (req: Request, res: Response,): Promise<Response> {
  const body = req.body
  if (!body) {
      return res.status(400).json({
          success: false,
          error: 'You must provide a body',
      })
  }

  const userID = body.id
  const accessToken = body.accessToken
  const username = body.username
  const name = body.name
  const email = body.email
  const fb_id = body.id
  
  console.log("Fetching Facebook likes")
  console.log(accessToken)
  try {
    const result = await Axios.get ("https://graph.facebook.com/v7.0/"+`${userID}` +"/likes", {
      headers: {
        'Authorization': `Bearer ${accessToken}` 
      }
    });
    
    let fbLikes: string[] = [];  
    const likes = result.data.data; 
    for (let i = 0, len = likes.length; i < len; i++) {
      fbLikes.push(likes[i].name);
    }

    console.log(fbLikes) //List of likes

    const hometownResult = await Axios.get ("https://graph.facebook.com/v7.0/"+`${userID}` +"?fields=hometown", {
      headers: {
        'Authorization': `Bearer ${accessToken}` 
      }
    });
    
    const hometown = hometownResult.data.hometown.name; 
    console.log(hometown)

    //TODO: record username, name, email, fb_id, likes, and hometown to Database.

    return res.status(200).json({
      success: true,
      message: "Successfully connected your account to Facebook!",
    })
  }
  catch (error) {
    console.log(error.message)
    return res.status(404).json({
      success: true,
      error: "Cannot retrieve information from Facebook...",
    })
  }
}