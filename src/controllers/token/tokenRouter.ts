import express from "express"
import { acceptTokenRoute } from "../../api/routes"
import fetch3rdPartyApi from "./fetch3rdPartyData"

const tokenRouter = express.Router()

tokenRouter.post(acceptTokenRoute.relative, fetch3rdPartyApi)

export default tokenRouter