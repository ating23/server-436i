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

function handlePostCalendar(req: any, res: Response, next: NextFunction): Response<any>  {
  const storage = multer.memoryStorage();
  const upload = multer({storage: storage}).single('calendar');

  try {
    upload(req, res, async function (err: any) {
      if (err) {
        return res.status(statusCodes.BAD_REQUEST).send(err);
      } else if (req.file === undefined || req.file === null) {
        return res.status(statusCodes.BAD_REQUEST).send({error: "ICS file is empty or nothing was uploaded"})        
      } else {
        await ical.async.parseICS(`${Buffer.from(req.file.buffer)}`)
          .then((calendarData: Record<string, any>) => {
            // write to DB
            // 
            const accountId = 1;
            const ret = createCalendarFromIcsData(accountId, Object.values(calendarData));
            return res.status(statusCodes.CREATED).send(ret);    
          });
        }
    })
  } catch(err) {
    console.log(err);
    return res.status(statusCodes.BAD_REQUEST).send({error: `${err}`});
  }
  return res.status(statusCodes.BAD_REQUEST);
}

export {
  handlePostCalendar
}