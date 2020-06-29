import { Request, Response, NextFunction } from "express"
import { MongoEmptyResultError, MongoObjectIdCastError } from "../../../errors/messages/ServicesErrorMessages"
import CourseModel from "../../../db/models/Course.model"
import { generateCourseApiResponse } from "../helpers/getCourseHelpers"
import { Mongoose } from "mongoose"
import statusCodes from "../../../api/statusCodes"

export default async function getCoursesHandler (req: Request, res: Response, next: NextFunction): Promise<void> {
  const { courseId } = req.params
  const query = { _id: courseId }

  try {
    const singleCourse = await CourseModel.findOne(query)

    if (!singleCourse) {
      return next(MongoEmptyResultError)
    } 
    else {
      res.json(generateCourseApiResponse (singleCourse))
      return
    }
  } 
  catch (error) {
    if (error instanceof Mongoose.prototype.CastError) {
      return next(MongoObjectIdCastError)
    } 
    else {
      res.status(statusCodes.BAD_REQUEST).send(error)
      return
    }
  } 

}