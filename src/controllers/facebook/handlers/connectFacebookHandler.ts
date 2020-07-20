import { Request, Response } from "express"
import Axios from "axios"
import FacebookLikesDocument from "../../../db/models/FacebookLikes.model"
import AccountsModel from "../../../db/models/Accounts.model"
import statusCodes from "../../../api/statusCodes"

export default async function connectFacebookHandler (req: Request, res: Response,): Promise<Response> {
  // TEST 
  // const msg = req.body
  // return res.status(200).json({
  //   success: true,
  //   message: "Successfully connected your account to Facebook!",
  //   content: msg
  // })

  const body = req.body
  if (!body) {
      return res.status(400).json({
          success: false,
          error: 'You must provide a body',
      })
  }
  console.log("body: ", body)
  const facebookId = body.id
  const accessToken = body.accessToken
  const accountId = res.locals.token.id
  const name = body.name
  const email = body.email
  const profilePic = body.profilePicURL
  // console.log(accountId)
  try {
    console.log("Fetching Facebook likes")
    const result = await Axios.get("https://graph.facebook.com/v7.0/"+`${facebookId}` +"/likes", {
      headers: {
        'Authorization': `Bearer ${accessToken}` 
      }
    });
    
    let fbLikes: string[] = [];  
    const likes = result.data.data; 
    for (let i = 0, len = likes.length; i < len; i++) {
      fbLikes.push(likes[i].name);
    }
    // console.log(fbLikes) //List of likes

    console.log("Fetching hometown from Facebook")
    const hometownResult = await Axios.get("https://graph.facebook.com/v7.0/"+`${facebookId}` +"?fields=hometown", {
      headers: {
        'Authorization': `Bearer ${accessToken}` 
      }
    });
    // const hometown = hometownResult.data.hometown.name; 
    // console.log(hometown)

    console.log("Recording Facebook data to MongoDB")
    const likesIds: string[] = []
    await Promise.all(fbLikes.map(async function saveFbLike(fbLike) {
      const account = await AccountsModel.findById(accountId)
      if (!account) {
        throw new Error ("An account was not found.")
      }
      
      const likeItem = await FacebookLikesDocument.findOne({ 
        like: fbLike
      })
      if (!likeItem) {
        const newLike = new FacebookLikesDocument({
          accounts: [accountId],
          like: fbLike,
        })
        const savedLike = await newLike.save()
        likesIds.push(savedLike._id)
      }
      // Likes already exists : id
      else {
        if (!likeItem.accounts.includes(accountId)) {
          likeItem.accounts.push(accountId)
        }
        await likeItem.save()
        likesIds.push(likeItem._id)
      }
    }))

    await AccountsModel.findByIdAndUpdate(accountId, {
      facebookVerified: true,
      facebook: {
        facebookId: facebookId,
        name: name,
        email: email,
        hometown: hometownResult.data.hometown? hometownResult.data.hometown.name : "",
        profilePicURL: profilePic,
        likes: likesIds
      }
    })
    console.log("Successfully recorded Facebook data to MongoDB")
    res.status(statusCodes.OK)
    return res.status(200).json({
      success: true,
      message: "Successfully connected your account to Facebook!",
    })
  }
  catch (error) {
    console.log("error in try-catch: ", error.message)
    return res.status(404).json({
      success: true,
      error: "Cannot retrieve information from Facebook...",
    })
  }
}