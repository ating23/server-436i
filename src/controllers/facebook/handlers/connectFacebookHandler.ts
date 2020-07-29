import { Request, Response } from "express"
import Axios from "axios"
import AccountsModel from "../../../db/models/Accounts.model"
import FacebookLikesModel from "../../../db/models/FacebookLikes.model"
import statusCodes from "../../../api/statusCodes"

const FACEBOOK_VERSION = "v7.0"

export default async function connectFacebookHandler(req: Request, res: Response): Promise<Response> {
  const { body } = req
  if (!body) {
    return res.status(400).json({ success: false, error: "You must provide a body" })
  }

  const accountId = res.locals.token.id
  const { accessToken, id: facebookId, name, email, profilePicURL: profilePic } = body

  try {
    console.log("Fetching Facebook likes")
    const result = await Axios.get(`https://graph.facebook.com/${FACEBOOK_VERSION}/${facebookId}/likes`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )

    const fbLikes: string[] = []
    const likes = result.data.data
    for (let i = 0, len = likes.length; i < len; i++) {
      fbLikes.push(likes[i].name)
    }
    // console.log(fbLikes) //List of likes

    console.log("Fetching hometown from Facebook")
    const hometownResult = await Axios.get(`https://graph.facebook.com/${FACEBOOK_VERSION}/${facebookId}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { fields: "hometown" }
      }
    )
    console.log("Recording Facebook data to MongoDB")

    const likesIds: string[] = []
    await Promise.all(fbLikes.map(async function saveFbLike(fbLike) {
      const account = await AccountsModel.findById(accountId)
      if (!account) {
        throw new Error ("An account was not found.")
      }
      
      const likeItem = await FacebookLikesModel.findOne({ 
        name: fbLike
      })
      if (!likeItem) {
        const newLike = new FacebookLikesModel({
          accounts: [accountId],
          name: fbLike,
        })
        const savedLike = await newLike.save()
        likesIds.push(savedLike._id)
      }
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
        hometown: hometownResult.data.hometown
          ? hometownResult.data.hometown.name
          : "",
        profilePicURL: profilePic,
        likes: likesIds,
      },
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
