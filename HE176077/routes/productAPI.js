var express = require("express");
var router = express.Router();

//===========================| API: GET |===========================
//api get list product that available in database
//1. call model
var modelProduct = require("../models/productModel");

//2. get list all product
//localhost:3000/product-api
router.get("/", async function (req, res, next) {
  //lấy data ra
  var dataBack = await modelProduct.find();
  res.json(dataBack);
});

//3. get product by id - 2 ways
//===| by params |===
//localhost:3000/product-api/detail-by-id-params/6631342fb28c06d447cd7b69
router.get("/detail-by-id-params/:id", async function (req, res, next) {
  var id = req.params.id;
  var dataBack = await modelProduct.findById(id);
  res.json(dataBack);
});
//find ALL product and back its name
//localhost:3000/product-api/name-by-id/6631342fb28c06d447cd7b69
router.get("/name-by-id/:id", async function (req, res, next) {
  var id = req.params.id;
  var dataBack = await modelProduct.find({ _id: id }, "name");
  res.json(dataBack);
});
//===| by query |===
//localhost:3000/product-api/detail-by-id-query?id=6631342fb28c06d447cd7b69
router.get("/detail-by-id-query", async function (req, res, next) {
  var idNe = req.query.id;
  var dataBack = await modelProduct.findById({ _id: idNe }); //-> return API chứa : 1 Object
  var dataBack2 = await modelProduct.find({ _id: idNe }); //-> return API chứa : 1  Array
  res.json(dataBack2);
});

//4. get all name and price of all product
//localhost:3000/product-api/name-price
//find({}, "name price"); -> {} : find all, "name price" : return name and price
//Các trường muốn tìm cần viết giống trong mongodb
router.get("/name-price", async function (req, res, next) {
  var dataBack = await modelProduct.find({}, "name price");
  res.json(dataBack);
});
//localhost:3000/product-api/name
router.get("/name", async function (req, res, next) {
  var dataBack = await modelProduct.find({}, "name");
  res.json(dataBack);
});

//5. Api lọc ra danh sách sản phẩm có range giá từ min đến max
//2 cách: by params và by query, by body
router.get("/search-price", async function (req, res, next) {
  //var min = req.query.min;
  //var max = req.query.max;
  //gte: greater than or equal, lớn hơn hoặc bằng - lte: less than or equal, nhỏ hơn hoặc bằng
  //localhost:3000/product-api/search-price?min=100&max=60000
  var { min, max } = req.query; //min, max là 2 biến trong query từ người dùng
  var dataBack = await modelProduct.find({ price: { $gte: min, $lte: max } });
  res.json(dataBack);
});

//CRUD
//================================| API: POST |===========================
//1. create new product
router.post("/create", async function (req, res, next) {
  try {
    var { name, price } = req.body;
    var productAdd = { name, price };

    var dataBack = await modelProduct.create(productAdd);
    // res.json(dataBack);
    //đang muốn trả về Object chứa status và message
    if (dataBack) {
      res.json({ status: 1, message: "Thêm mới thành công!" });
    } else {
      res.json({ status: 0, message: "Thêm mới thất bại!" });
    }
  } catch (error) {
    res.json({ status: -1, error: error });
  }
});

module.exports = router;
