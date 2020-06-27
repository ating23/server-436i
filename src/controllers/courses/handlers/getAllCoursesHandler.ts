import { Request, Response, NextFunction } from "express"
import statusCodes from "../../../api/statusCodes"
import CourseModel from "../../../db/models/Course.model"
import { generateCourseApiResponse } from "../helpers/getCourseHelpers"
import { MongoEmptyResultError } from "../../../errors/messages/ServicesErrorMessages"
import Logger from "../../../errors/Logger"

export default async function getAllCoursesHandler (req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const allCourses = await CourseModel.find({})
    Logger.Log ("Found: ", allCourses)
  
    if (!allCourses || allCourses.length === 0) {
      return next(MongoEmptyResultError)
    } 
    else {
      const courses = allCourses.map((courseItem) => generateCourseApiResponse(courseItem))
      res.status(statusCodes.OK).json({ courses })
      return 
    }
  }
  catch (error) {
    return next (error)
  }
}