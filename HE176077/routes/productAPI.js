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
//1. create new product
//http://localhost:3000/product-api/create
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

//2. read/get product by id
//http://localhost:3000/product-api/detail
router.post("/detail", async function (req, res, next) {
  try {
    var { id } = req.body;
    var dataBack = await modelProduct.findById(id);
    if (dataBack) {
      res.json(dataBack);
    } else {
      res.json({ status: 0, message: "Không tìm thấy sản phẩm!" });
    }
  } catch (e) {
    res.json({ status: -1, error: e, message: "Lỗi không xác định!" });
  }
});

//3. edit/update product by id
//http://localhost:3000/product-api/update
router.post("/update", async function (req, res, next) {
  try {
    var { id, name, price } = req.body;
    //find product by id
    var productFound = await modelProduct.findById(id);
    if (productFound != null) {
      //update product
      //if name is null, keep the old name -> nếu người dùng không nhập name thì giữ nguyên name cũ
      productFound.name = name ? name : productFound.name;
      //if price is null, keep the old price -> nếu người dùng không nhập price thì giữ nguyên price cũ
      productFound.price = price ? price : productFound.price;
      var dataBack = await productFound.save();
      if (dataBack) {
        res.json({ status: 1, message: "Cập nhật thành công!" });
      } else {
        res.json({ status: 0, message: "Cập nhật thất bại!" });
      }
    } else {
      res.json({ status: 0, message: "Không tìm thấy sản phẩm!" });
    }
  } catch (e) {
    res.json({ status: -1, error: e, message: "Cập nhật thất bại!" });
  }
});

//4. delete product by id
//http://localhost:3000/product-api/delete
router.post("/delete-post", async function (req, res, next) {
  try {
    var { id } = req.body;
    //có thể dùng find id and update (xóa mềm) hoặc findByIdAndDelete (xóa cứng)
    var dataBack = await modelProduct.findByIdAndDelete(id);
    if (dataBack) {
      res.json({ status: 1, message: "Xóa thành công!" });
    } else {
      res.json({ status: 0, message: "Xóa thất bại! Không tìm thấy" });
    }
  } catch (e) {
    res.json({ status: -1, error: e, message: "Xóa thất bại!" });
  }
});
//http://localhost:3000/product-api/delete-get?id=6631342fb28c06d447cd7b69
router.get("/delete-get", async function (req, res, next) {
  try {
    var { id } = req.query;
    var dataBack = await modelProduct.findByIdAndDelete(id);
    if (dataBack != null) {
      res.json({ status: 1, message: "Xóa thành công!" });
    } else {
      res.json({ status: 0, message: "Xóa thất bại! Khong tim thay san pham" });
    }
  } catch (e) {
    res.json({ status: -1, error: e, message: "Xóa thất bại!" });
  }
});

module.exports = router;
