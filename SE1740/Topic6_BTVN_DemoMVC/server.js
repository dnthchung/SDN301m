//import express module,.env module
import express from "express";
import * as dotenv from "dotenv";
import connectDB from "./database/database";

dotenv.config();

// Tạo đối tượng app để khởi tạo web container
const app = express();
app.use(express.json());

// Cấu hình hoạt động routing (định tuyến) các request gửi tới web server
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//khai báo port cho web
const port = process.env.PORT || 8080;

app.listen(port, async () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
