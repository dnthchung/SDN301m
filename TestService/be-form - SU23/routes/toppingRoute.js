const bodyParser = require("body-parser");
const express = require("express");

const { ToppingController } = require("../controllers/index.js");

const toppingRouter = express.Router();
toppingRouter.use(bodyParser.json());

toppingRouter.get("/", ToppingController.getAll);
toppingRouter.post("/create", ToppingController.create);
toppingRouter.put("/:toppingId", ToppingController.update);
toppingRouter.delete("/:toppingId", ToppingController.delete);

module.exports = toppingRouter;
