import express from "express"
import { acceptTokenRoute } from "../../api/routes"
import acceptTokenHandler from "./acceptTokenHandler"
import fetch3rdPartyApi from "./fetch3rdPartyData"

const tokenRouter = express.Router()

tokenRouter.post(acceptTokenRoute.relative, acceptTokenHandler, fetch3rdPartyApi)

export default tokenRouter