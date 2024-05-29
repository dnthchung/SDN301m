//import express module,.env module
import express, { json } from "express";
import * as dotenv from "dotenv";
import connectDB from "./database/database.js";
//import components router
import { UserRouter } from "./routes/index.js";

dotenv.config();

// Tạo đối tượng app để khởi tạo web container
const app = express();
app.use(express.json());

// Cấu hình hoạt động routing (định tuyến) các request gửi tới web server
app.get("/", (req, res) => {
  //localhost:8080/
  res.send("Hello World!");
});

app.use("/user", UserRouter);

//khai báo port cho web
const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});

//model -> repo -> index -> controller -> index -> router -> server
