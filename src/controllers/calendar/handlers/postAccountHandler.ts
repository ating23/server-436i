import express, { Request, Response, NextFunction } from "express"

import statusCodes from "../../../api/statusCodes"

function handlePostCalendar (req: express.Request, res: express.Response, next: express.NextFunction): void {
  // ...
  res.status(statusCodes.CREATED).send("hello")
}

export {
  handlePostCalendar
}