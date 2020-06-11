import express from 'express'

import {handlePostCalendar} from "./handlers/postAccountHandler"

import {
  postCalendarRoute
} from "../../api/routes"

const calendarRouter = express.Router();

calendarRouter.post(postCalendarRoute.relative, handlePostCalendar);

export default calendarRouter;