import nodemailer from "nodemailer"
import mg from "nodemailer-mailgun-transport"
import ErrorHandler from "../../errors/ErrorHandler"
import statusCodes from "../../api/statusCodes"
import { MAILGUN_CONFIG } from "./mailgunConfig"

export default class Nodemailer {
  toName: string
  toEmail: string
  subject: string
  link: string

  constructor (toName: string, toEmail: string, subject: string, link: string) {
    this.toName = toName
    this.toEmail = toEmail
    this.subject = subject
    this.link = link
  }

  public sendMail (): Promise<object> {
    const { toName, toEmail, subject, link } = this
    
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
        html: `
        <p>
          Click on this link to reset password: <a href="${link}">Reset Password</a>
        </p>
        `
      })
      .then((info: object) => {
        resolve(info)
      })
      .catch((err: Error) => {
        reject(err)
      })
    })
  }
}
