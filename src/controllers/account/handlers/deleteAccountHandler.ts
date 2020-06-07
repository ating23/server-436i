import express, { Request, Response, NextFunction } from "express"

export default function deleteAccountHandler (req: express.Request, res: express.Response, next: express.NextFunction): void {
  // ...
  res.send(true)
}