import { Request, Response, NextFunction } from "express"
import CoursesModel from "../../../../db/models/Courses.model"
import SpotifyArtistsModel from "../../../../db/models/SpotifyArtists.model"
import FacebookLikesModel from "../../../../db/models/FacebookLikes.model"
import SpotifyTracksModel from "../../../../db/models/SpotifyTracks.model"
import { Types } from "mongoose"
import { NoAccountFoundError } from "../../../../errors/messages/ServicesErrorMessages"
import AccountsModel, { AccountsDocument } from "../../../../db/models/Accounts.model"

function findIdsInCommon(me: string[], other: string[]): string[] {
  const common: string[] = []
  me.forEach(artistId => {
    if (other.includes(artistId)) {
      common.push(artistId)
    }
  })
  return common
}

export default async function getCoursesHandler(_req: Request, res: Response, next: NextFunction): Promise<void> {
  const id = res.locals.token.id
  if (!id) {
    return next(NoAccountFoundError)
  }

  
  try {
    const myAccount = await AccountsModel.findById(id)
    if (!myAccount) {
      return next (new Error ("No account found"))
    }

    const courses = await CoursesModel.find({ accounts: {$in: [id]} })
    // Logger.Log ("Courses found: ", courses)
    if (!courses || courses.length === 0) {
      res.json({ courses: [] })
      return
    } 
    
    const uniqueStudentIds: Types.ObjectId[] = []
    courses.forEach(courseItem => {
      for (const studentId of courseItem.accounts) {
        const id = Types.ObjectId(studentId)
        if (!uniqueStudentIds.includes(id)) {
          uniqueStudentIds.push(Types.ObjectId(studentId))
        }
      }
    })

    const uniqueStudents: { [s: string ]: AccountsDocument } = {}
    const students = await AccountsModel.find({ _id: { $in: uniqueStudentIds }})
    students.forEach(student => {
      if(!uniqueStudents[student._id]) {
        uniqueStudents[student._id] = student
      }
    })

    const coursesData = await Promise.all(courses.map(async course => {
      const accounts = await Promise.all(course.accounts.map(async accountId => {
        if (accountId === id) return null
        const accountData = uniqueStudents[accountId]
        const spotifyImgURL = accountData.spotifyVerified? accountData.spotify.image? accountData.spotify.image.url : null : null
        const facebookImgURL = accountData.facebookVerified? accountData.facebook.profilePicURL? accountData.facebook.profilePicURL : null : null
        let imageURL = ""
        if (spotifyImgURL) {
          imageURL = spotifyImgURL
        }
        if (!imageURL && facebookImgURL){
          imageURL = facebookImgURL
        }
        const commonArtistIds = findIdsInCommon(
          myAccount.spotify.artists, 
          accountData.spotify.artists
        )
        const artistsData = await SpotifyArtistsModel.find({
          _id: { $in: commonArtistIds }
        })
        const commonArtists = artistsData.map(artist => ({
          artistId: artist._id,
          name: artist.name,
          url: artist.url,
          profileURL: artist.image.url
        }))
        const commonCourseIds = findIdsInCommon(
          myAccount.courses,
          accountData.courses
        )
        const coursesData = await CoursesModel.find({
          _id: { $in: commonCourseIds }
        })
        const commonCourses = coursesData.map(course => ({
          courseId: course._id,
          courseNumber: course.courseNumber,
          courseDept: course.courseDept,
          courseSection: course.courseSection
        }))
        const commonLikeIds = findIdsInCommon(
          myAccount.facebook.likes,
          accountData.facebook.likes
        )
        const likesData = await FacebookLikesModel.find({
          _id: { $in: commonLikeIds }
        })
        const commonLikes = likesData.map(like => ({
          likeId: like._id,
          name: like.name
        }))
        const commonTrackIds = findIdsInCommon(
          myAccount.spotify.tracks,
          accountData.spotify.tracks
        )
        const tracksData = await SpotifyTracksModel.find({
          _id: { $in: commonTrackIds }
        })
        const commonTracks = tracksData.map(track => ({
          trackId: track._id,
          name: track.name,
          url: track.url,
          profileURL: track.image.url
        }))
        return {
          accountId: accountData._id,
          name: accountData.name,
          profileURL: imageURL,
          commonArtists,
          commonCourses,
          commonLikes,
          commonTracks
        }
      }))
      return {
        courseId: course._id,
        courseDept: course.courseDept,
        courseNumber: course.courseNumber,
        courseSection: course.courseSection,
        students: accounts
      }
    }))
    res.json({ courses: coursesData })
    return
  }
  catch (error) {
    return next (error)
  }
}