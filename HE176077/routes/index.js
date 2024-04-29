var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// router.get("/product", function (req, res, next) {
//   var products = [
//     {
//       id: 1,
//       name: "Product 1",
//       price: 100,
//     },
//     {
//       id: 2,
//       name: "Product 2",
//       price: 200,
//     },
//     {
//       id: 3,
//       name: "Product 3",
//       price: 300,
//     },
//   ];
//   res.render("index", { title: "List Product", myProducts: products });
// });

module.exports = router;
