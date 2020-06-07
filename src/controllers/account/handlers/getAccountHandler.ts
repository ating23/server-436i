import express, { Request, Response, NextFunction } from "express";

export default function getAccountHandler (req: express.Request, res: express.Response, next: express.NextFunction): void {
  // ...
  res.send(true);
}