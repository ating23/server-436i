import express, { Request, Response, NextFunction } from "express"
const ical = require('node-ical');
const multer = require('multer');
import ClassModel from "../../../db/models/Class.model"
import statusCodes from "../../../api/statusCodes"

class Calendar {
  accountId: number;
  classes: string[];

  constructor(accountID: number, classArr: string[]) {
    this.accountId = accountID;
    this.classes = classArr;
  }
}

const createCalendarFromIcsData = (accountId: number, icsData: Record<string, any>): Calendar => {
  const arr: string[] = [];

  icsData.forEach((item: Record<string, any>) => {
    if (item.type === "VEVENT") {
      const index = item.summary.indexOf(' ', item.summary.indexOf( ' ' ) + 1 );
      const classCode = item.summary.substr(0, index);
      if (!arr.includes(classCode)) {
        arr.push(classCode);
      }
    }  
  })
          
  return new Calendar(accountId, arr);
}

const checkFileisICS = (name: string): boolean => {
  return name.split('.').pop() === "ics"
}

/**
 * DATABASE HELPERS
 */
const checkClassExists = async (classCode: string): Promise<boolean> => {
  const existingClass = await ClassModel.findOne({classCode: classCode});
  if (existingClass) {
    return true;
  }
  return false;
}

const updateClassInDB = async (classCode: string, studentID: string): Promise<boolean> => {
  try {
    const existingClass = await ClassModel.findOne({classCode: classCode});
    existingClass?.students.push(studentID);
    await existingClass?.save();
    return Promise.resolve(true);
  } catch (error) {
    return Promise.reject(false);
  }
}

const writeNewClassInDB = async (classCode: string, studentID: string): Promise<any> => {
  const students: [string] = [studentID];
  const newClass = new ClassModel({classCode: classCode, students: students});

  newClass.save((err, classCreated) => {
    if (err) {
      return Promise.reject({error: err});
    }
    console.log(classCreated);
    return Promise.resolve({classCreated});
  })
}

function handlePostCalendar(req: any, res: Response, next: NextFunction): void {
  const storage = multer.memoryStorage();
  const upload = multer({storage: storage}).single('calendar');
  const studentID = res.locals.token.id;

  upload(req, res, function (err: any) {
    if (err) {
      return res.status(statusCodes.BAD_REQUEST).send(err);
    } else if (req.file === undefined || req.file === null) {
      return res.status(statusCodes.BAD_REQUEST).send({error: "ICS file is empty or nothing was uploaded"})
    } else if (!checkFileisICS(req.file.originalname)) {   
      return res.status(statusCodes.BAD_REQUEST).send({error: "file type is not an ics calendar"});
    } else {
      const calendarData = ical.sync.parseICS(`${Buffer.from(req.file.buffer)}`);
      const ret = createCalendarFromIcsData(studentID, Object.values(calendarData));

      ret.classes.forEach(async (classCode: string) => {
        if (await checkClassExists(classCode)) {
          // if class exists, add student ID to its student list
          await updateClassInDB(classCode, studentID);
          console.log("class updated");
        } else {
          // if class DNE, create it and add studentID to its student list
          let x = await writeNewClassInDB(classCode, studentID);
          console.log("new class written to DB: " + x);
        }
      })
      // TODO: handle extra case
      // if student already has existing calendar

      return res.status(statusCodes.CREATED).send(ret);    
    }
  })
}

export {
  handlePostCalendar
}