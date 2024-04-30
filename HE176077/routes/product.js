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
  var _id = new Date().getTime();
  productsData.push({
    // id: productsData.length + 1,
    // id: Math.floor(Math.random() * 1000),
    id: _id,
    name: nameSP,
    price: priceSP,
  });
  res.redirect("/sanpham");
});

//edit area, next mean khi xong function này, có thể next sang function khác á
//http://localhost:3000/sanpham/edit?idNe=1 "idNe" must change in hbs file
router.get("/edit", function (req, res, next) {
  //truyen = query string
  var masp = req.query.idNe;
  var index = productsData.findIndex((x) => x.id == masp);
  res.render("editProduct", {
    title: "Edit Product",
    details: productsData[index],
  });
});
//http://localhost:3000/sanpham/edit2/1
router.get("/edit2/:idNe", function (req, res, next) {
  //truyen = parameter
  var masp = req.params.idNe;
  var index = productsData.findIndex((x) => x.id == masp);
  res.render("editProduct", {
    title: "Edit Product",
    details: productsData[index],
  });
});

router.post("/change-in4", function (req, res, next) {
  //get data from body - phụ thuộc bên view edit, bên đó name là gì thì lấy cái đó
  var { idSP, nameSP, priceSP } = req.body;

  var index = productsData.findIndex((x) => x.id == idSP);
  //update data
  productsData[index].name = nameSP;
  productsData[index].price = priceSP;
  //redirect to list product
  res.redirect("/sanpham");
});

module.exports = router;
