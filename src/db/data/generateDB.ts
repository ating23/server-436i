/* eslint-disable @typescript-eslint/no-explicit-any */
import AccountsModel from "../models/Accounts.model"
import CoursesModel from "../models/Courses.model"
import FacebookLikesModel from "../models/FacebookLikes.model"
import SpotifyArtistsModel from "../models/SpotifyArtists.model"
import SpotifyTracksModel from "../models/SpotifyTracks.model"
import { testAccounts } from "./testAccounts"
import { testArtistsData } from "./testArtistsData"
import { testCoursesData } from "./testCoursesData"
import { testFacebookLikesData } from "./testFacebookLikesData"
import { testTracksData } from "./testTracksData"

const accountSetup = [
  { num: 15, spotify: true, calendar: true, facebook: true },
  { num: 10, spotify: true, calendar: true, facebook: false },
  { num: 10, spotify: true, calendar: false, facebook: true },
  { num: 10, spotify: false, calendar: true, facebook: true },
  { num: 5, spotify: true, calendar: false, facebook: false },
  { num: 5, spotify: false, calendar: true, facebook: false },
  { num: 5, spotify: false, calendar: false, facebook: true },
]

function generateUniqueIndices (upperBound: number, amount: number): number[] {
  const lowerBound = 0
  const uniqueIndices: number[] = []

  while (uniqueIndices.length < amount) {
    const randomIndex = Math.floor(
      Math.random()*(upperBound - lowerBound) + lowerBound
    )
    if (uniqueIndices.indexOf(randomIndex) == -1) { 
      uniqueIndices.push( randomIndex );
    }
  }
  return uniqueIndices
}

export default async function generateDB(): Promise<void> {
  const accountsFull: any[] = []
  const artistsFull: any[] = []
  const coursesFull: any[] = []
  const likesFull: any[] = []
  const tracksFull: any[] = []

  await Promise.all(testAccounts.map(async account => {
    const newAccount = new AccountsModel(account)
    const savedAccount = await newAccount.save()
    accountsFull.push({
      ...newAccount,
      _id: savedAccount._id
    })
  }))
  console.log("Completed: testAccounts store")
  
  await Promise.all(testArtistsData.map(async artist => {
    const newArtist = new SpotifyArtistsModel({
      spotifyId: artist.spotifyId,
      accounts: [],
      name: artist.name,
      popularity: artist.popularity,
      followers: artist.followers,
      genres: artist.genres,
      image: artist.images[0],
      url: artist.url,
    })
    const savedArtist = await newArtist.save()
    artistsFull.push({
      ...artist,
      _id: savedArtist._id
    })
  }))
  console.log("Completed: testArtistsData store")

  await Promise.all(testCoursesData.map(async course => {
    const newCourse = new CoursesModel({
      ...course,
      accounts: []
    })
    const savedCourse = await newCourse.save()
    coursesFull.push({
      ...course,
      _id: savedCourse._id
    })
  }))
  console.log("Completed: testCoursesData store")

  await Promise.all(testFacebookLikesData.map(async like => {
    const newLike = new FacebookLikesModel({
      facebookId: like.facebookId,
      accounts: [],
      name: like.name
    })
    const savedLike = await newLike.save()
    likesFull.push({
      ...like,
      _id: savedLike._id
    })
  }))
  console.log("Completed: testFacebookLikesData store")

  await Promise.all(testTracksData.map(async track => {
    const newTrack = new SpotifyTracksModel({
      spotifyId: track.spotifyId,
      accounts: [],
      name: track.name,
      popularity: track.popularity,
      image: track.images[0],
      audioPreviewURL: track.audioPreviewURL,
      url: track.url,
      artists: []
    })
    const savedTrack = await newTrack.save()
    tracksFull.push({
      ...newTrack,
      _id: savedTrack._id
    })
  }))
  console.log("Completed: testTracksData store")
  
  for (const setup of accountSetup) {
    const accounts = accountsFull.splice(0, setup.num)
    
    await Promise.all(accounts.map(async account => {
      try {
        if (setup.calendar) {
          const mongoAccount = await AccountsModel.findById(account._id)
          if (!mongoAccount) throw new Error ("Mongo failed to find the account")
          // generate 4 unique courses for account
          const indices = generateUniqueIndices(coursesFull.length, 4)
          const courseIds = indices.map(index => coursesFull[index]._id)
          mongoAccount.courses.push(...courseIds)
          await mongoAccount.save()
          console.log("Saved calendar to account")
          await Promise.all(courseIds.map(async courseId => {
            const mongoCourse = await CoursesModel.findById(courseId)
            if (!mongoCourse) throw new Error ("Mongo failed to find the course")
            mongoCourse.accounts.push(mongoAccount._id)
            await mongoCourse.save()
          }))
        }
    
        if(setup.facebook) {
          const mongoAccount = await AccountsModel.findById(account._id)
          if (!mongoAccount) throw new Error ("Mongo failed to find the account")
          // generate 15 unique facebook likes for account
          const indices = generateUniqueIndices(likesFull.length, 15)
          const likeIds = indices.map(index => likesFull[index]._id)
          mongoAccount.facebook.likes.push(...likeIds)
          mongoAccount.facebookVerified = true
          await mongoAccount.save()
          console.log("Saved facebook to account")
          await Promise.all(likeIds.map(async likeId => {
            const mongoLike = await FacebookLikesModel.findById(likeId)
            if(!mongoLike) throw new Error ("Mongo failed to find the like")
            mongoLike.accounts.push(mongoAccount._id)
            await mongoLike.save()
          }))
        }
    
        if (setup.spotify) {
          const mongoAccount = await AccountsModel.findById(account._id)
          if (!mongoAccount) throw new Error ("Mongo failed to find the account")
          // generate 15 unique spotify artists for account
          const artistsIndices = generateUniqueIndices(artistsFull.length, 15)
          const artistIds = artistsIndices.map(index => artistsFull[index]._id)
          // generate 15 unique spotify tracks for account
          const tracksIndices = generateUniqueIndices(tracksFull.length, 15)
          const trackIds = tracksIndices.map(index => tracksFull[index]._id)
          mongoAccount.spotify.artists.push(...artistIds)
          mongoAccount.spotify.tracks.push(...trackIds)
          mongoAccount.spotifyVerified = true
          await mongoAccount.save()
          console.log("Saved spotify to account")
          await Promise.all(artistIds.map(async artistId => {
            const mongoArtist = await SpotifyArtistsModel.findById(artistId)
            if(!mongoArtist) throw new Error ("Mongo failed to find the artist")
            mongoArtist.accounts.push(mongoAccount._id)
            await mongoArtist.save()
          }))
          await Promise.all(trackIds.map(async trackId => {
            const mongoTrack = await SpotifyTracksModel.findById(trackId)
            if(!mongoTrack) throw new Error ("Mongo failed to find the track")
            mongoTrack.accounts.push(mongoAccount._id)
            await mongoTrack.save()
          }))
        }
      }
      catch (error) {
        console.error (error)
        throw error
      }
    }))
  }
  
}