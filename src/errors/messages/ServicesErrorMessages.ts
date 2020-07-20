import ErrorHandler from "../ErrorHandler"
import statusCodes from "../../api/statusCodes"

export const NoAccountFoundError = new ErrorHandler (
  "No Account Found",
  statusCodes.BAD_REQUEST,
  "No account was found in the database"
)

export const MongoUnavaiableError = new ErrorHandler(
  "Postgres Unavailable",
  statusCodes.INTERNAL_SERVER_ERROR,
  "The database is currently offline."
)

export const JwtFailedError = new ErrorHandler(
  "JSON Web Token Error",
  statusCodes.INTERNAL_SERVER_ERROR,
  "JSON Web Token failed to create a valid token."
)

export const MongoEmptyResultError = new ErrorHandler(
  "Query returned no results",
  statusCodes.BAD_REQUEST,
  "Query returned no results"
)

export const MongoObjectIdCastError = new ErrorHandler(
  "Invalid Course ID input",
  statusCodes.BAD_REQUEST,
  "The input courseId could not be queried as it failed to cast to a Mongo ObjectId "
)

export const CalendarNullUploadError = new ErrorHandler(
  "No Calendar was uploaded",
  statusCodes.BAD_REQUEST,
  "No file was uploaded"
)

export const CalendarUploadFileTypeError = new ErrorHandler(
  "Calendar uploaded has incorrect file type",
  statusCodes.BAD_REQUEST,
  "The file uploaded was not of file type .ics"
)

export const SpotifyEmptyResultError = new ErrorHandler(
  "Spotify API did not return any content",
  statusCodes.BAD_REQUEST,
  "There was no content in Spotify API response, user may not have any favourite tracks or artists"
)

export const SpotifyServiceDownError = new ErrorHandler(
  "Spotify API returned 500",
  statusCodes.BAD_REQUEST,
  "Spotify API service may be down"
)

export const SpotifyBearerTokenError = new ErrorHandler(
  "Our request to Spotify's API had a bad bearer token",
  statusCodes.BAD_REQUEST,
  "Check the token in the request to Spotify's API"
)