import express from "express";

import deleteAccountHandler from "./handlers/deleteAccountHandler";
import getAccountHandler from "./handlers/getAccountHandler";
import getProfileHandler from "./handlers/getProfileHandler";
import updateAccountHandler from "./handlers/updateAccountHandler";

import {
  deleteAccountRoute,
  getAccountRoute,
  updateAccountRoute,
  getProfileRoute,
} from "../../api/routes";

const accountRouter = express.Router();

accountRouter.get(getAccountRoute.relative, getAccountHandler);
accountRouter.get(getProfileRoute.relative, getProfileHandler);
// accountRouter.patch(updateAccountRoute.relative, updateAccountHandler)
// accountRouter.delete(deleteAccountRoute.relative, deleteAccountHandler)

export default accountRouter;
