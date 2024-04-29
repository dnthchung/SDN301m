var express = require("express");
var router = express.Router();

//data
var productsData = [
  {
    id: 1,
    name: "Product 1",
    price: 100,
  },
  {
    id: 2,
    name: "Product 2",
    price: 200,
  },
  {
    id: 3,
    name: "Product 3",
    price: 300,
  },
];

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.render("listProduct", {
    title: "List Product",
    myProducts: productsData,
  });
});

//go to add new product page
router.get("/add", function (req, res, next) {
  res.render("addProduct", { title: "Add Product" });
});

// get data and save add new product
router.post("/add", function (req, res, next) {
  var { nameSP, priceSP } = req.body;
  productsData.push({
    id: productsData.length + 1,
    name: nameSP,
    price: priceSP,
  });
  res.redirect("/sanpham");
});

module.exports = router;
