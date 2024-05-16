const bodyParser = require("body-parser");
const express = require("express");
const promoRouter = express.Router();
const createHttpError = require("http-errors");

//nếu không có body-parser, express không thể đọc được body của request
promoRouter.use(bodyParser.json());

// ======== /:id =========
//GET id
//localhost:3000/promotions/:promoId
promoRouter.get("/:promoId", (req, res, next) => {
  res.status(200).json({
    message: "GET promo by id",
    promoId: req.params.promoId,
  });
});

//Put - update promo by id
//localhost:3000/promotions/:promoId
promoRouter.put("/:promoId", (req, res, next) => {
  res.status(200).json({
    message: "PUT promo by id",
    promoId: req.params.promoId,
    body: req.body,
  });
});

//Post - create new promo
promoRouter.post("/", (req, res, next) => {
  res.status(201).json({
    message: "POST new promo",
    body: req.body,
  });
});

//Delete by id
promoRouter.delete("/:promoId", (req, res, next) => {
  res.status(200).json({
    message: "DELETE promo by id",
    promoId: req.params.promoId,
  });
});

// ============= /promotions/:promoId  =====
//GET id
//localhost:3000/promotions/:promoId
promoRouter.get("/promotions/:promoId", (req, res, next) => {
  res.status(200).json({
    message: "GET promo by id",
    promoId: req.params.promoId,
  });
});

//Put - update promo by id
//localhost:3000/promotions/:promoId
promoRouter.put("/promotions/:promoId", (req, res, next) => {
  res.status(200).json({
    message: "PUT promo by id",
    promoId: req.params.promoId,
    body: req.body,
  });
});

//Post - create new promo
promoRouter.post("/promotions", (req, res, next) => {
  res.status(201).json({
    message: "POST new promo",
    body: req.body,
  });
});

//Delete by id
promoRouter.delete("/promotions/:promoId", (req, res, next) => {
  res.status(200).json({
    message: "DELETE promo by id",
    promoId: req.params.promoId,
  });
});

module.exports = promoRouter;
