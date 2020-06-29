import express from "express"
import { acceptTokenRoute } from "../../api/routes"
import acceptTokenHandler from "./acceptTokenHandler"

const tokenRouter = express.Router()

tokenRouter.post(acceptTokenRoute.relative, acceptTokenHandler)

export default tokenRouter