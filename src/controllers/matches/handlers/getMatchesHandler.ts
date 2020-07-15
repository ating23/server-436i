import { Types } from "mongoose"
import { NextFunction, Request, Response } from "express"
import AccountsModel from "../../../db/models/Accounts.model"
import CoursesModel from "../../../db/models/Courses.model"
import SpotifyArtistsModel from "../../../db/models/SpotifyArtists.model"
import SpotifyTracksModel from "../../../db/models/SpotifyTracks.model"

interface MatchObject {
  matches: number
  courses: string[]
  artists: string[]
  tracks: string[]
}

interface IStudentHashMap {
  [studentId: string]: MatchObject
}

async function getMatchesHandler (req: Request, res: Response, next: NextFunction): Promise<void> {
  const { id: accountId } = res.locals.token

  try {
    const account = await AccountsModel.findById(accountId)
    if (!account) {
      return next (new Error("Account was not found"))
    }

    const StudentHashMap: IStudentHashMap = {}
    const { courses, spotify } = account
    const { artists, tracks } = spotify

    /**
     * Retrieve @Mongo Data
     */
    const mongoCourses = await CoursesModel.find({
      _id: { $in: courses.map(course => Types.ObjectId(course)) }
    })
    const CoursesHashMap = mongoCourses.map(mongoCourse => ({
      [mongoCourse._id]: mongoCourse
    }))
    const mongoArtists = await SpotifyArtistsModel.find({
      _id: { $in: artists.map(artist => Types.ObjectId(artist)) }
    })
    const ArtistsHashMap = mongoArtists.map(mongoArtist => ({
      [mongoArtist._id]: mongoArtist
    }))
    const mongoTracks = await SpotifyTracksModel.find({
      _id: { $in: tracks.map(track => Types.ObjectId(track)) }
    })
    const TracksHashMap = mongoTracks.map(mongoTrack => ({
      [mongoTrack._id]: mongoTrack
    }))
    
    /**
     * @Courses Matching
     */
    if (mongoCourses && mongoCourses.length > 0) {
      for (const mongoCourse of mongoCourses) {
        const { accounts } = mongoCourse
        const courseId = mongoCourse._id
        for (const account of accounts) {
          if (account == accountId) continue
          if(StudentHashMap[account]) {
            StudentHashMap[account].courses.push(courseId)
            StudentHashMap[account].matches++
          } 
          else {
            StudentHashMap[account] = {
              matches: 1,
              artists: [],
              courses: [courseId],
              tracks: []
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
        const { accounts } = mongoArtist
        const artistId = mongoArtist._id
        for (const account of accounts) {
          if (account == accountId) continue
          if(StudentHashMap[account]) {
            StudentHashMap[account].artists.push(artistId)
            StudentHashMap[account].matches++
          } 
          else {
            StudentHashMap[account] = {
              matches: 1,
              artists: [artistId],
              courses: [],
              tracks: []
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
        const { accounts } = mongoTrack
        const trackId = mongoTrack._id
        for (const account of accounts) {
          if (account == accountId) continue
          if(StudentHashMap[account]) {
            StudentHashMap[account].tracks.push(trackId)
            StudentHashMap[account].matches++
          } 
          else {
            StudentHashMap[account] = {
              matches: 1,
              artists: [],
              courses: [],
              tracks: [trackId]
            }
          }
        }
      }
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
      matchData: StudentHashMap[accountMatch._id]
    }))

    res.json({ matches })
    return
  }
  catch (error) {
    return next(error)
  }


}

export default getMatchesHandler