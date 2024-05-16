const bodyParser = require("body-parser");
const express = require("express");
const authenRouter = express.Router();
const createHttpError = require("http-errors");

authenRouter.use(bodyParser.json());
