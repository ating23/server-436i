import express from "express"

import deleteAccountHandler from "./handlers/deleteAccountHandler"
import getAccountHandler from "./handlers/getAccountHandler"
import updateAccountHandler from "./handlers/updateAccountHandler"

import { 
  deleteAccountRoute,
  getAccountRoute, 
  updateAccountRoute 
} from "../../api/routes"

const accountRouter = express.Router()

accountRouter.get(getAccountRoute.relative, getAccountHandler)
// accountRouter.patch(updateAccountRoute.relative, updateAccountHandler)
// accountRouter.delete(deleteAccountRoute.relative, deleteAccountHandler)

export default accountRouter