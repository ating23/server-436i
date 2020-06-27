import { Request, Response, NextFunction, query } from "express";
import statusCodes from "../../../api/statusCodes";
import Logger from "../../../errors/Logger";
import CourseModel from "../../../db/models/Course.model";
import { CourseApiResponse } from "../helpers/courseTypes";
import { generateCourseApiResponse } from "../helpers/getCourseHelpers"
import { MongoEmptyResultError, MongoObjectIdCastError } from "../../../errors/messages/ServicesErrorMessages";
import { Mongoose } from "mongoose";

export default async function getCourseHandler (req: Request, res: Response, next: NextFunction): Promise<void> {
  if (req.params.courseId === undefined || req.params.id === null) {
    Logger.Log("Request for GET all courses received")
    const allCourses = await CourseModel.find({});
    
    if (!allCourses || allCourses.length === 0) {
      return next(MongoEmptyResultError)
    } else {
      const arr: CourseApiResponse[] = [];
      allCourses.forEach((item) => {
        const x = generateCourseApiResponse(item);
        arr.push(x);
      })
      res.status(statusCodes.OK).send(arr);
    }

  } else {

    Logger.Log("Request for GET single course: ", req.params.courseId)

    try {
      const query = {
        _id: req.params.courseId
      }
      
      const singleCourse = await CourseModel.findOne(query);
      if (!singleCourse) {
        return next(MongoEmptyResultError);
      } else {
        res.json(generateCourseApiResponse(singleCourse))
      }
    } catch (error) {
      if (error instanceof Mongoose.prototype.CastError) {
        return next(MongoObjectIdCastError)
      } else {
        res.status(statusCodes.BAD_REQUEST).send(error);
      }
    } 

  }
}