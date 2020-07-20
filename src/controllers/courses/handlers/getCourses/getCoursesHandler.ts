import { Request, Response, NextFunction } from "express"
import Logger from "../../../../errors/Logger"
import statusCodes from "../../../../api/statusCodes"
import CoursesModel, { CoursesDocument } from "../../../../db/models/Courses.model"
import { generateResponse } from "./getCourseHelpers"
import { NoAccountFoundError } from "../../../../errors/messages/ServicesErrorMessages"
import AccountsModel from "../../../../db/models/Accounts.model"
import { Types } from "mongoose"

export interface Classmate {
  accountId: string;
  name: string;
}

async function findClassmates(course: CoursesDocument): Promise<Classmate[]> {
  const classmates = await AccountsModel.find({
    _id: { $in: course.accounts.map(classMate => Types.ObjectId(classMate)) }
  })

  const ret: Classmate[] = []
  classmates.forEach(classmate => {
    const x = {
      accountId: classmate._id,
      name: classmate.name
    }
    ret.push(x)
  })
  return ret;
}

export default async function getCoursesHandler(_req: Request, res: Response, next: NextFunction): Promise<void> {
  const id = res.locals.token.id;
  
  if (!id) {
    next(NoAccountFoundError)
  }

  try {
    const courses = await CoursesModel.find({accounts: {$in: [id]}})
    Logger.Log ("Courses found: ", courses)
    if (!courses || courses.length === 0) {
      res.json({ courses: []})
      return 
    } 

    const accountCourses = await Promise.all(courses.map(async (courseItem) => {
      const x = await findClassmates(courseItem)
      return generateResponse(courseItem, x)
    }))

    res.status(statusCodes.OK).json({ courses: accountCourses })
    return 
  }
  catch (error) {
    return next (error)
  }
}