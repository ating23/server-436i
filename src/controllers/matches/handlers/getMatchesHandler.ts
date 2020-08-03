import { Types } from "mongoose"
import { NextFunction, Request, Response } from "express"
import AccountsModel from "../../../db/models/Accounts.model"
import CoursesModel from "../../../db/models/Courses.model"
import SpotifyArtistsModel from "../../../db/models/SpotifyArtists.model"
import SpotifyTracksModel from "../../../db/models/SpotifyTracks.model"
import FacebookLikesModel from "../../../db/models/FacebookLikes.model"

interface MatchObject {
  matches: number;
  profileURL: string;
  commonCourses: CourseMatchObject[];
  commonArtists: ArtistMatchObject[];
  commonTracks: TrackMatchObject[];
  commonLikes: FacebookLikeObject[];
}

interface ArtistMatchObject {
  artistId: string;
  name: string;
  profileURL: string | null;
  url: string;
}

interface TrackMatchObject {
  trackId: string;
  name: string;
  profileURL: string | null;
  url: string;
}

interface CourseMatchObject {
  courseDept: string;
  courseId: string;
  courseNumber: string;
  courseSection: string;
}

interface FacebookLikeObject {
  likeId: string;
  name: string;
}

interface StudentHashMap {
  [studentId: string]: MatchObject;
}

async function getMatchesHandler (req: Request, res: Response, next: NextFunction): Promise<void> {
  const { id: accountId } = res.locals.token

  try {
    const account = await AccountsModel.findById(accountId)
    if (!account) {
      return next (new Error("Account was not found"))
    }

    const StudentHashMap: StudentHashMap = {}
    const { courses, spotify, facebook } = account
    const { artists, tracks } = spotify

    /**
     * Retrieve @Mongo Data
     */
    const mongoCourses = await CoursesModel.find({
      _id: { $in: courses.map(course => Types.ObjectId(course)) }
    })
    const mongoArtists = await SpotifyArtistsModel.find({
      _id: { $in: artists.map(artist => Types.ObjectId(artist)) }
    })
    const mongoTracks = await SpotifyTracksModel.find({
      _id: { $in: tracks.map(track => Types.ObjectId(track)) }
    })
    const facebookLikes = await FacebookLikesModel.find({
      _id: { $in: facebook.likes.map(like => Types.ObjectId(like)) }
    })
    
    /**
     * @Courses Matching
     */
    if (mongoCourses && mongoCourses.length > 0) {
      for (const mongoCourse of mongoCourses) {
        const { accounts, _id, courseDept, courseSection, courseNumber } = mongoCourse
        const course: CourseMatchObject = {
          courseId: _id,
          courseDept,
          courseSection,
          courseNumber
        }
        for (const account of accounts) {
          if (account == accountId) continue
          if(StudentHashMap[account]) {
            StudentHashMap[account].commonCourses.push(course)
            StudentHashMap[account].matches++
          } 
          else {
            StudentHashMap[account] = {
              matches: 1,
              commonArtists: [],
              commonCourses: [course],
              commonTracks: [],
              commonLikes: [],
              profileURL: ""
            }
          }
        }
      }
    }

    /**
     * @Artists Matching
     */
    if (mongoArtists && mongoArtists.length > 0) {
      for (const mongoArtist of mongoArtists) {
        const { accounts, _id, name, image, url} = mongoArtist
        const artist: ArtistMatchObject = {
          artistId: _id,
          name,
          profileURL: image.url ? image.url : null,
          url
        }
        for (const account of accounts) {
          if (account == accountId) continue
          if(StudentHashMap[account]) {
            StudentHashMap[account].commonArtists.push(artist)
            StudentHashMap[account].matches++
          } 
          else {
            StudentHashMap[account] = {
              matches: 1,
              commonArtists: [artist],
              commonCourses: [],
              commonTracks: [],
              commonLikes: [],
              profileURL: ""
            }
          }
        }
      }
    }

    /**
     * @Tracks Matching
     */
    if (mongoTracks && mongoTracks.length > 0) {
      for (const mongoTrack of mongoTracks) {
        const { accounts, _id, name, image, url } = mongoTrack
        const track: TrackMatchObject = {
          trackId: _id,
          name,
          profileURL: image.url ? image.url : null,
          url
        }
        for (const account of accounts) {
          if (account == accountId) continue
          if(StudentHashMap[account]) {
            StudentHashMap[account].commonTracks.push(track)
            StudentHashMap[account].matches++
          } 
          else {
            StudentHashMap[account] = {
              matches: 1,
              commonArtists: [],
              commonCourses: [],
              commonTracks: [track],
              commonLikes: [],
              profileURL: ""
            }
          }
        }
      }
    }

    /**
     * @FacebookLikes Matching
     */
    if (facebookLikes && facebookLikes.length > 0) {
      for (const facebookLike of facebookLikes) {
        const { accounts, _id, name } = facebookLike
        const like: FacebookLikeObject = {
          likeId: _id,
          name
        }
        for (const account of accounts) {
          if (account == accountId) continue
          if(StudentHashMap[account]) {
            StudentHashMap[account].commonLikes.push(like)
            StudentHashMap[account].matches++
          } 
          else {
            StudentHashMap[account] = {
              matches: 1,
              commonArtists: [],
              commonCourses: [],
              commonTracks: [],
              commonLikes: [like],
              profileURL: ""
            }
          }
        }
      }
    }

    /**
     * Generate @ProfilePic
     */
    for (const studentId in StudentHashMap) {
      const account = await AccountsModel.findById(studentId)
      if (!account) {
        return next (new Error("Account was not found"))
      }
      const spotifyImgURL = account.spotifyVerified? account.spotify.image? account.spotify.image.url : null : null
      const facebookImgURL = account.facebookVerified? account.facebook.profilePicURL? account.facebook.profilePicURL : null : null
      let imageURL = ""
      if (spotifyImgURL) {
        imageURL = spotifyImgURL
      }
      if (!imageURL && facebookImgURL){
        imageURL = facebookImgURL
      }
      StudentHashMap[studentId].profileURL = imageURL
    }

    /**
     * Generate @Response (JSON)
     */
    const matchesIds = Object.keys(StudentHashMap)
    const mongoAccountMatches = await AccountsModel.find({
      _id: { $in: matchesIds.map(matchId => Types.ObjectId(matchId)) }
    })

    const matches = mongoAccountMatches.map(accountMatch => ({
      accountId: accountMatch._id,
      name: accountMatch.name,
      profileURL: StudentHashMap[accountMatch._id].profileURL,
      matches: StudentHashMap[accountMatch._id].matches,
      commonCourses: StudentHashMap[accountMatch._id].commonCourses,
      commonArtists: StudentHashMap[accountMatch._id].commonArtists,
      commonTracks: StudentHashMap[accountMatch._id].commonTracks,
      commonLikes: StudentHashMap[accountMatch._id].commonLikes
    }))

    res.json({ matches })
    return
  }
  catch (error) {
    return next(error)
  }


}

export default getMatchesHandler