import bodyParser from "body-parser"
import cors from "cors"
import dotenv from "dotenv"
import express from "express"

import api from "./api/api"
import { apiRoute } from "./api/routes"
import startServer from "./config/startServer"

/**
 * @Errors
 */
import LogErrorHandler from "./errors/LogErrorHandler"
import catchAllErrorHandler from "./errors/handlers/catchAllErrorHandler"

dotenv.config()

const PORT = process.env.SERVER_PORT || 5000
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(apiRoute, api)

/**
 * @Error Handling
 */
app.use(LogErrorHandler)
app.use(catchAllErrorHandler)

/**
 * @Server Startup
 */
app.listen(PORT, startServer)