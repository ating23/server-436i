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