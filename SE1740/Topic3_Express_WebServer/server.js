const express = require("express");
//khởi tạo 1 web server : express
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;

//định nghĩa 1 route / định tuyến các request từ clien tới đường dẫn gốc của web server
app.get("/", (req, res) => {
  res.send("Hello World");
});

//khởi động web server ở cổng 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
