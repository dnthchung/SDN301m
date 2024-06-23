const bodyParser = require("body-parser");
const express = require("express");
const { RoleController } = require("../controllers/index.js");

const roleRouter = express.Router();
roleRouter.use(bodyParser.json());

//create router
roleRouter.post("/create", RoleController.create);

module.exports = roleRouter;
