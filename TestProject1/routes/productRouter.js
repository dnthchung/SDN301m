var express = require("express");
var router = express.Router();

//get product from controller
import { create, read } from "../controllers/product.controller";

router.post("/create", create);
