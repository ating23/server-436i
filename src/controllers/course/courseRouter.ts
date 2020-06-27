import express from "express"

import getCourseHandler from "./handlers/getCourseHandler"

import { 
  getCourseRoute, getAllCourseRoute, 
} from "../../api/routes"

const accountRouter = express.Router()

accountRouter.get(getAllCourseRoute.relative, getCourseHandler)
accountRouter.get(getCourseRoute.relative, getCourseHandler)

export default accountRouter