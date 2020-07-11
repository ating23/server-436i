import express from "express"
import authorizeFacebookHandler from "./handlers/authorizeFacebookHandler"
import deauthorizeFacebookHandler from "./handlers/deauthorizeFacebookHandler"
import deleteFacebookHandler from "./handlers/deleteFacebookHandler"
import { 
  authorizeFacebookRoute, 
  deauthorizeFacebookRoute, 
  deleteFacebookRoute 
} from "../../api/routes"

const facebookRouter = express.Router()

facebookRouter.get(authorizeFacebookRoute.relative, authorizeFacebookHandler)
facebookRouter.get(deauthorizeFacebookRoute.relative, deauthorizeFacebookHandler)
facebookRouter.get(deleteFacebookRoute.relative, deleteFacebookHandler)

export default facebookRouter