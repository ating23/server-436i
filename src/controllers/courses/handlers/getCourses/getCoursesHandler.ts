import { Request, Response, NextFunction } from "express"
import Logger from "../../../../errors/Logger"
import statusCodes from "../../../../api/statusCodes"
import CoursesModel from "../../../../db/models/Courses.model"
import { generateResponse } from "./getCourseHelpers"
import { MongoEmptyResultError } from "../../../../errors/messages/ServicesErrorMessages"

export default async function getCoursesHandler(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const courses = await CoursesModel.find({})
    Logger.Log ("Courses found: ", courses)
  
    if (!courses || courses.length === 0) {
      Logger.Error("No courses found.")
      return next(MongoEmptyResultError)
    } 
    const accountCourses = courses.map((courseItem) => generateResponse(courseItem))
    res.status(statusCodes.OK).json({ courses: accountCourses })
    return 
  }
  catch (error) {
    return next (error)
  }
}