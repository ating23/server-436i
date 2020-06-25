// https://expressjs.com/en/advanced/best-practice-performance.html

import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"

dotenv.config()

import api from "./api/api"
import { apiRoute } from "./api/routes"
import startServer from "./config/startServer"

/**
 * @Errors
 */
import LogErrorHandler from "./errors/LogErrorHandler"
import catchAllErrorHandler from "./errors/handlers/catchAllErrorHandler"
import Logger from "./errors/Logger"
import CourseModel from "./db/models/Course.model"


/**
 * @Connect Mongoose
 */
const { connection: db } = mongoose
const uri = String(process.env.MONGODB_URI)

mongoose.connect(uri, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useCreateIndex: true
})

db.on("error", console.error.bind(console, "connection error:"))
db.once("open", function() {
  Logger.Log ("Mongoose running.")
})

const PORT = process.env.PORT || 5000
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(apiRoute, api)

CourseModel.find ({}, (err, res) => console.log(res))

/**
 * @Error Handling
 */
app.use(LogErrorHandler)
app.use(catchAllErrorHandler)

/**
 * @Server Startup
 */
app.listen(PORT, startServer)