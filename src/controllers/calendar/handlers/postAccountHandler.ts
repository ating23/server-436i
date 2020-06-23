import express, { Request, Response, NextFunction } from "express"
const ical = require('node-ical');
const multer = require('multer');

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
      if (!arr.includes(item.summary)) {
        arr.push(item.summary)
      }
    }  
  })
          
  return new Calendar(accountId, arr);
}

const checkFileisICS = (name: string): boolean => {
  return name.split('.').pop() === "ics"
}

function handlePostCalendar(req: any, res: Response, next: NextFunction): void {
  const storage = multer.memoryStorage();
  const upload = multer({storage: storage}).single('calendar');
  console.log(res.locals.token);

  upload(req, res, function (err: any) {
    if (err) {
      return res.status(statusCodes.BAD_REQUEST).send(err);
    } else if (req.file === undefined || req.file === null) {
      return res.status(statusCodes.BAD_REQUEST).send({error: "ICS file is empty or nothing was uploaded"})
    // TODO: check if file is of ics file type
    } else if (!checkFileisICS(req.file.originalname)) {   
      return res.status(statusCodes.BAD_REQUEST).send({error: "file type is not an ics calendar"});
    } else {
      console.log(req.file);
      const calendarData = ical.sync.parseICS(`${Buffer.from(req.file.buffer)}`);

      // TODO: write to DB

      const accountId = res.locals.token.id;
      const ret = createCalendarFromIcsData(accountId, Object.values(calendarData));
      return res.status(statusCodes.CREATED).send(ret);    
    }
  })
}

export {
  handlePostCalendar
}