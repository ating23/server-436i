import statusCodes from "../api/statusCodes"

export default class ErrorHandler extends Error {
  errorName: string
  statusCode: statusCodes
  errorClientMessage: string
  errorTimestamp: Date
  
  constructor(errorName: string, statusCode: number, errorClientMessage: string) {
    super()
    this.errorName = errorName
    this.statusCode = statusCode
    this.errorClientMessage = errorClientMessage
    this.errorTimestamp = new Date()
  }
}