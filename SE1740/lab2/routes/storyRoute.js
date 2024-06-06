const bodyParser = require("body-parser");
const express = require("express");

const { StoryController } = require("../controllers/index.js");

const storyRouter = express.Router();
storyRouter.use(bodyParser.json());

//create router
storyRouter.post("/add", StoryController.add);
storyRouter.put("/edit/:id", StoryController.edit);

module.exports = storyRouter;
