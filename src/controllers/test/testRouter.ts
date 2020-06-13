import express, { Request, Response } from "express"
import Logger from "../../errors/Logger"
import Nodemailer from "../../helpers/nodemailer/Nodemailer"
import AccountModel from "../../db/models/Account.model"
import generateVerifyCodeEmail from "../../helpers/nodemailer/emails/generateVerifyCodeEmail"

const testRouter = express.Router ()

/**
 * @Test api
 */
testRouter.get("/", async (req: Request, res: Response) => {
  const {
    NODE_ENV,
    JWT_KEY,
    MAILGUN_API_KEY,
    MONGODB_URI
  } = process.env
  Logger.Log  ("Hit route: /")
  Logger.Log ("NODE_ENV = ", 
    NODE_ENV,
    JWT_KEY,
    MAILGUN_API_KEY,
    MONGODB_URI
  )
  return res.json ({ received: true })
})

/**
 * @Test Mongoose/Mongo
 */
testRouter.get("/mongo", async (req: Request, res: Response) => {
  Logger.Log  ("Hit route: /mongo")
  try {
    const result = await AccountModel.find ({})
    Logger.Log  ("Result: ", result)
    return res.json({ result })
  }
  catch (error) {
    Logger.Error  ("Hit error: ", error)
    return res.json({ error })
  }
})

/**
 * @Test Nodemailer
 */
testRouter.get("/mail", async (req: Request, res: Response) => {
  Logger.Log ("Testing sending mail with Nodemailer")

  const code = "507f1f77bcf86cd799439011"
  const name = "Eduardo Garza"
  const email = "eduardo@garza.ca"
  const subject = `${code} is your Educonnection account recovery code`
  const htmlBody = generateVerifyCodeEmail (code, name, email)
  
  const newMail = new Nodemailer (name, email, subject, htmlBody)
  newMail.sendMail ()
  
  return res.json ({ received: true })
})


export default testRouter