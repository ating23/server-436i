import nodemailer from "nodemailer"
import mg from "nodemailer-mailgun-transport"
import ErrorHandler from "../../errors/ErrorHandler"
import statusCodes from "../../api/statusCodes"
import { MAILGUN_CONFIG } from "./mailgunConfig"
import Logger from "../../errors/Logger"

export default class Nodemailer {
  toName: string
  toEmail: string
  subject: string
  htmlBody: string

  constructor (toName: string, toEmail: string, subject: string, htmlBody: string) {
    this.toName = toName
    this.toEmail = toEmail
    this.subject = subject
    this.htmlBody = htmlBody
  }

  public sendMail (): Promise<object> {
    const { toName, toEmail, subject, htmlBody } = this
    
    return new Promise((resolve, reject) => {
      const { MAILGUN_API_KEY } = process.env
      if (!MAILGUN_API_KEY) {
        return reject (new ErrorHandler (
          "Mailgun Undefined", 
          statusCodes.INTERNAL_SERVER_ERROR, 
          "Mailgun is undefined."
        ))
      }
      
      // Defines connection data
      const authOptions: mg.AuthOptions = {
        // eslint-disable-next-line @typescript-eslint/camelcase
        api_key: MAILGUN_API_KEY,
        domain: MAILGUN_CONFIG.domain
      }
  
      const auth: mg.Options = { auth: authOptions }
      const transporter = nodemailer.createTransport(mg(auth))
    
      return transporter.sendMail({
        from: MAILGUN_CONFIG.sender,
        to: `${toName} <${toEmail}>`,
        subject: subject,
        html: htmlBody
      })
      .then((info: object) => {
        Logger.Log ("Successully sent mail: " , info)
        return resolve(info)
      })
      .catch(error => {
        Logger.Error ("Error in sending mail: ", error)
        return reject(error)
      })
    })
  }
}
