import ErrorHandler from "../ErrorHandler";
import statusCodes from "../../api/statusCodes";

/**
 * @Authorization Errors
 * 
 * When no bearer token is provided to an protected route.
 */
export const NoTokenError = new ErrorHandler(
  "Authorization Error", 
  statusCodes.BAD_REQUEST, 
  "No authorization token provided."
);

export const InvalidTokenError = new ErrorHandler(
  "Authorization Error", 
  statusCodes.BAD_REQUEST, 
  "Invalid authorization token provided."
);