import express from "express"

import loginHandler from "./handlers/loginHandler"
import signupHandler from "./handlers/signupHandler/signupHandler"
import forgotPasswordHandler from "./handlers/forgotPasswordHandler"
import { 
  loginRoute, 
  signupRoute, 
  forgotPasswordRoute, 
  resetPasswordRoute,
  verifyResetRoute
} from "../../api/routes"
import { verifyAuthorizationToken } from "./helpers/verifyAuthorizationToken"
import resetPasswordHandler from "./handlers/resetPasswordHandler"
import verifyResetCodeHandler from "./handlers/verifyResetCodeHandler"

const authRouter = express.Router()

authRouter.post(loginRoute.relative, loginHandler)
authRouter.post(signupRoute.relative, signupHandler)
authRouter.post(forgotPasswordRoute.relative, forgotPasswordHandler)
authRouter.get(verifyResetRoute.relative, verifyResetCodeHandler)
authRouter.post(resetPasswordRoute.relative, verifyAuthorizationToken, resetPasswordHandler)

export default authRouter