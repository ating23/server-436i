import { Request, Response, NextFunction } from "express"
import Logger from "../../../../errors/Logger"
import statusCodes from "../../../../api/statusCodes"
import CoursesModel from "../../../../db/models/Courses.model"
import { generateResponse } from "./getCourseHelpers"
import { NoAccountFoundError } from "../../../../errors/messages/ServicesErrorMessages"

export default async function getCoursesHandler(_req: Request, res: Response, next: NextFunction): Promise<void> {
  const id = res.locals.token.id;
  
  if (!id) {
    next(NoAccountFoundError)
  }

  try {    
    const query = {
      accounts: {$in: [id]}
    }
  
    const courses = await CoursesModel.find(query)
    Logger.Log ("Courses found: ", courses)
  
    if (!courses || courses.length === 0) {
      res.json({ courses: []})
      return 
    } 
    const accountCourses = courses.map((courseItem) => generateResponse(courseItem))
    res.status(statusCodes.OK).json({ courses: accountCourses })
    return 
  }
  catch (error) {
    return next (error)
  }
}