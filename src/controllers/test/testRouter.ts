import express, { Request, Response } from "express";
import Logger from "../../errors/Logger";
import Nodemailer from "../../helpers/nodemailer/Nodemailer";
import AccountModel from "../../db/models/Accounts.model";
import generateVerifyCodeEmail from "../../helpers/nodemailer/emails/generateVerifyCodeEmail";
const localDB = require("../../db/startMongo");
import bcrypt from "bcryptjs";
const assert = require("assert");
const MongoClient = require("mongodb").MongoClient;
var ObjectID = require("mongodb").ObjectID;
import { async } from "node-ical";
import { Collection } from "mongoose";
import { MongoObjectIdCastError } from "../../errors/messages/ServicesErrorMessages";
import AccountsModel from "../../db/models/Accounts.model";
const testRouter = express.Router();

/**
 * @Test api
 */
testRouter.get("/", async (req: Request, res: Response) => {
  const { NODE_ENV, JWT_KEY, MAILGUN_API_KEY, MONGODB_URI } = process.env;
  Logger.Log("Hit route: /");
  Logger.Log("NODE_ENV = ", NODE_ENV, JWT_KEY, MAILGUN_API_KEY, MONGODB_URI);
  return res.json({ received: true });
});

/**
 * @Test Mongoose/Mongo
 */
testRouter.get("/mongo", async (req: Request, res: Response) => {
  Logger.Log("Hit route: /mongo");
  try {
    const result = await AccountModel.find({});
    Logger.Log("Result: ", result);
    return res.json({ result });
  } catch (error) {
    Logger.Error("Hit error: ", error);
    return res.json({ error });
  }
});

/**
 * @Test Nodemailer
 */
testRouter.get("/mail", async (req: Request, res: Response) => {
  Logger.Log("Testing sending mail with Nodemailer");

  const code = "507f1f77bcf86cd799439011";
  const name = "Eduardo Garza";
  const email = "eduardo@garza.ca";
  const subject = `${code} is your Educonnection account recovery code`;
  const htmlBody = generateVerifyCodeEmail(code, name, email);

  const newMail = new Nodemailer(name, email, subject, htmlBody);
  newMail.sendMail();

  return res.json({ received: true });
});
testRouter.get("/resetDB", async (req: Request, res: Response) => {
  // Connection URL
  const uri =
    "mongodb+srv://ismail:8rgtjgcw0oo@sandbox-u2eog.mongodb.net/<dbname>?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true });
  try {
    client.connect(async () => {
      // Connection URL
      const url = "mongodb://localhost:27017";

      // Database Name
      const dbName = "educonnections";
      //clearing the collection before re-writing
      MongoClient.connect(url, function (
        err: any,
        localClient: { db: (arg0: string) => any }
      ) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = localClient.db(dbName);
        db.collection("accounts").remove();
      });

      var accounts = client.db("dummyData").collection("accounts").find();
      accounts.forEach(
        (account: { password: string; name: any; email: any }) => {
          const salt = bcrypt.genSaltSync(10);
          const passwordHash = bcrypt.hashSync(account.password);
          const newAccount = new AccountsModel({
            name: account.name,
            email: account.email,
            password: passwordHash,
          });
          newAccount.save();
        }
      );
      /**const collection = client.db("dummyData").collection("accounts");

      collection.inse rtOne;
      var i;
      for (i = 0; i < 10; i++) {
        var object = {
          _id: new ObjectID(),
          name: randomEl(adjectives) + randomEl(nouns),
          email: makeEmail(),
          password: generatePassword(),
          spotifyVerified: false,
          facebookVerified: false,
        };
        collection.insertOne(object);
      }
      // perform actions on the collection object
      client.close();**/
    });
    Logger.Log("resetting DB");

    return res.json({ received: true });
  } catch (e) {
    Logger.Log("error occured in connected dummy data DB");
  }
});

export default testRouter;
