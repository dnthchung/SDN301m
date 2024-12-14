const bodyParser = require("body-parser");
const express = require("express");

//==
const db = require("../models");
const mongoose = require("mongoose");
//==

//==

//==
const movieRouter = express.Router();
movieRouter.use(bodyParser.json());
//==

//==
module.exports = movieRouter;
