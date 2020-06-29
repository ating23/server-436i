import express from "express"
import { uploadCalendarRoute } from "../../api/routes"
import calendarUploadHandler from "./handlers/calendarUploadHandler"

const calendarRouter = express.Router()

calendarRouter.post(uploadCalendarRoute.relative, calendarUploadHandler)

export default calendarRouter