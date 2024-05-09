const express = require("express");
//khởi tạo 1 web server : express
const app = express();

//định nghĩa 1 route / định tuyến các request từ clien tới đường dẫn gốc của web server
app.get("/", (req, res) => {
  res.send("Hello World");
});

export default app;
