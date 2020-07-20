import express from "express"
import authorizeFacebookHandler from "./handlers/authorizeFacebookHandler"
import deauthorizeFacebookHandler from "./handlers/deauthorizeFacebookHandler"
import deleteFacebookHandler from "./handlers/deleteFacebookHandler"
import connectFacebookHandler from "./handlers/connectFacebookHandler"
import { 
  authorizeFacebookRoute, 
  deauthorizeFacebookRoute, 
  deleteFacebookRoute ,
  connectFacebookRoute
} from "../../api/routes"

const facebookRouter = express.Router()

facebookRouter.get(authorizeFacebookRoute.relative, authorizeFacebookHandler)
facebookRouter.get(deauthorizeFacebookRoute.relative, deauthorizeFacebookHandler)
facebookRouter.get(deleteFacebookRoute.relative, deleteFacebookHandler)
facebookRouter.post(connectFacebookRoute.relative, connectFacebookHandler)

export default facebookRouter