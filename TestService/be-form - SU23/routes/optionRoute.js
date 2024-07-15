const bodyParser = require("body-parser");
const express = require("express");

const { OptionController } = require("../controllers/index.js");

const optionRouter = express.Router();
optionRouter.use(bodyParser.json());

optionRouter.get("/", OptionController.getAll);
optionRouter.post("/create", OptionController.create);

module.exports = optionRouter;
