import express from "express"

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
  verifyResetPasswordTokenRoute
} from "../../api/routes"

const authRouter = express.Router()

authRouter.post(loginRoute.relative, loginHandler)
authRouter.post(signupRoute.relative, signupHandler)
authRouter.post(forgotPasswordRoute.relative, forgotPasswordHandler)
authRouter.get(verifyResetPasswordTokenRoute.relative, resetPasswordGetHandler)
authRouter.post(resetPasswordRoute.relative, resetPasswordPostHandler)

export default authRouter