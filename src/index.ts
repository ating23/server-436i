import dotenv from "dotenv"
dotenv.config()
import cors from "cors"
import express from "express"
import bodyParser from "body-parser"
import api from "./api/api"
import { apiRoute } from "./api/routes"
import startServer from "./config/startServer"
import LogErrorHandler from "./errors/LogErrorHandler"
import catchAllErrorHandler from "./errors/handlers/catchAllErrorHandler"
import startMongo from "./db/startMongo"

/** Start @Mongo */
startMongo()

/** Setup @App */
const PORT = process.env.PORT || 5000
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(apiRoute, api)

/** @Error Handling */
app.use(LogErrorHandler)
app.use(catchAllErrorHandler)

/** @Server Startup */
app.listen(PORT, startServer)