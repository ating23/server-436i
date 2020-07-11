import express from "express"
import getCourseHandler from "./handlers/getAllCoursesHandler"
import getAllCoursesHandler from "./handlers/getAllCoursesHandler"
import { getCourseRoute, getAllCoursesRoute } from "../../api/routes"

const coursesRouter = express.Router()

coursesRouter.get(getAllCoursesRoute.relative, getAllCoursesHandler)
coursesRouter.get(getCourseRoute.relative, getCourseHandler)

export default coursesRouter