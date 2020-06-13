import express, { Request, Response } from "express"

import loginHandler from "./handlers/loginHandler"
import signupHandler from "./handlers/signupHandler/signupHandler"
import forgotPasswordHandler from "./handlers/forgotPasswordHandler"
import { 
  resetPasswordGetHandler, 
  resetPasswordPostHandler 
} from "./handlers/resetPasswordHandler"

import { 
  loginRoute, 
  signupRoute, 
  forgotPasswordRoute, 
  resetPasswordRoute,
  verifyResetRoute
} from "../../api/routes"
import Account from "../../db/models/Account.model"

const authRouter = express.Router()

// Test : Check Account (mongodb) document
authRouter.get("/", async (req: Request, res: Response) => {
  console.log ("Hit route: /")
  try {
    const result = await Account.find ({})
    console.log ("Result: ", result)
    return res.json({ result })
  }
  catch (error) {
    console.log ("Hit error: ", error)
    return res.json({ error })
  }
})

authRouter.post(loginRoute.relative, loginHandler)
authRouter.post(signupRoute.relative, signupHandler)

authRouter.post(forgotPasswordRoute.relative, forgotPasswordHandler)
authRouter.get(verifyResetRoute.relative, resetPasswordGetHandler)
authRouter.post(resetPasswordRoute.relative, resetPasswordPostHandler)

export default authRouter