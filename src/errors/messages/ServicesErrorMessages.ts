import ErrorHandler from "../ErrorHandler"
import statusCodes from "../../api/statusCodes"

export const PosgresUnavaiableError = new ErrorHandler(
  "Postgres Unavailable",
  statusCodes.INTERNAL_SERVER_ERROR,
  "The database is currently offline."
)

export const JwtFailedError = new ErrorHandler(
  "JSON Web Token Error",
  statusCodes.INTERNAL_SERVER_ERROR,
  "JSON Web Token failed to create a valid token."
)