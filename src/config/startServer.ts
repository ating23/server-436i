import Logger from "../errors/Logger"

const PORT = process.env.PORT || 5000
Logger.Log("startServer started and allocated to memory.")

export default function startServer (): void {
  Logger.Log (`Listening on PORT ${PORT}. Server is running in: ${process.env.NODE_ENV}`)
}