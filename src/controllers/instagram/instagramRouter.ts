import express from "express"
import authorizeInstagramHandler from "./handlers/authorizeInstagramHandler"
import deauthorizeInstagramHandler from "./handlers/deauthorizeInstagramHandler"
import deleteInstagramHandler from "./handlers/deleteInstagramHandler"
import { 
  authorizeInstagramRoute, 
  deauthorizeInstagramRoute, 
  deleteInstagramRoute 
} from "../../api/routes"

const instagramRouter = express.Router()

instagramRouter.get(authorizeInstagramRoute.relative, authorizeInstagramHandler)
instagramRouter.get(deauthorizeInstagramRoute.relative, deauthorizeInstagramHandler)
instagramRouter.get(deleteInstagramRoute.relative, deleteInstagramHandler)

export default instagramRouter