// Author: TrungQuanDev: https://youtube.com/@trungquandev
import express from "express";
import { dashboardController } from "~/controllers/dashboardController";
//middleware
import { isAuthorized } from "~/middlewares/authMiddleware";

const Router = express.Router();

Router.route("/access").get(isAuthorized, dashboardController.access);
// Router.route("/access").get(dashboardController.access);

export const dashboardRoute = Router;
