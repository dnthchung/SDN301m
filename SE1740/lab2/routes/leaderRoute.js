const bodyParser = require("body-parser");
const express = require("express");

const { LeaderController } = require("../controllers/index.js");

const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.post("/create", LeaderController.create);
leaderRouter.get("/", LeaderController.findAll);

leaderRouter.get("/:leaderId", LeaderController.findOne);

module.exports = leaderRouter;
