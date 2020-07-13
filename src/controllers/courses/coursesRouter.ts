import express from "express"
import { getCoursesRoute, uploadCoursesRoute } from "../../api/routes"
import getCoursesHandler from "./handlers/getCourses/getCoursesHandler"
import uploadCoursesHandler from "./handlers/uploadCourses/uploadCoursesHandler"

const coursesRouter = express.Router()

coursesRouter.get(getCoursesRoute.relative, getCoursesHandler)
coursesRouter.post(uploadCoursesRoute.relative, uploadCoursesHandler)

export default coursesRouter