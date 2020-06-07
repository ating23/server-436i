import express, { Request, Response, NextFunction } from "express"

function handleUpdateAccount (req: express.Request, res: express.Response, next: express.NextFunction): void {
  // ...
  res.send(true)
}

const updateAccountHandler = [
  handleUpdateAccount
]

export default updateAccountHandler