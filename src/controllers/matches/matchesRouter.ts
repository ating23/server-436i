import express from "express"
import { getMatchesRoutes } from "../../api/routes"
import getMatchesHandler from "./handlers/getMatchesHandler"

const matchesRouter = express.Router()

matchesRouter.get(getMatchesRoutes.relative, getMatchesHandler)

export default matchesRouter