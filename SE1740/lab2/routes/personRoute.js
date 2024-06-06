const bodyParser = require("body-parser");
const express = require("express");

const { PersonController } = require("../controllers/index.js");

const personRouter = express.Router();
personRouter.use(bodyParser.json());

personRouter.post("/add", PersonController.add);
//http://localhost:9999/api/person/edit/66617d5338909af8a05427bb
personRouter.put("/edit/:id", PersonController.edit);
//http://localhost:9999/api/person/list
personRouter.get("/list", PersonController.list2);

module.exports = personRouter;
