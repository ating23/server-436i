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