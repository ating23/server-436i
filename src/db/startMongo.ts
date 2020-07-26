import { connection, connect } from "mongoose"
import Logger from "../errors/Logger"

export default function startMongo(): void {
  Logger.Log("Starting Mongo...")
  const uri = String(process.env.MONGODB_URI)
  
  connect(uri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    autoIndex: false,
  }, (error) => {
    console.log("Mongo Error: ", error)
  })
  
  connection.on("error", console.error.bind(console, "connection error:"))
  connection.once("open", function() {
    Logger.Log ("Mongo running...")
  })
}