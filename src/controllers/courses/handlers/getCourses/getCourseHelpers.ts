import { Types } from "mongoose"
import AccountsModel from "../../../../db/models/Accounts.model"
import { CoursesDocument } from "../../../../db/models/Courses.model"

interface CourseApiResponse {
  // Auth
  courseId: string;
  accounts: Classmate[];
  // Data
  courseDept: string;
  courseNumber: string;
  courseSection: string;
  startDate: Date;
  endDate: Date;
}

export interface Classmate {
  accountId: string;
  name: string;
  profileURL: string;
}

export async function findClassmates (course: CoursesDocument): Promise<Classmate[]> {
  const classmates = await AccountsModel.find({
    _id: { $in: course.accounts.map(classMate => Types.ObjectId(classMate)) }
  })

  // for each classmate, get artists, courses, likes, tracks in common

  const ret: Classmate[] = []
  classmates.forEach(classmate => {
    const student = {
      accountId: classmate._id,
      name: classmate.name,
      profileURL: classmate.spotify.image.url
    }
    ret.push(student)
  })
  return ret;
}

export function generateResponse(course: CoursesDocument, classmates: Classmate[]): CourseApiResponse {
  return {
    courseId: course._id,
    accounts: classmates,
    courseDept: course.courseDept,
    courseNumber: course.courseNumber,
    courseSection: course.courseSection,
    startDate: course.startDate,
    endDate: course.endDate
  }
}