import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import httpError from "http-errors";
import dotenv from "dotenv";
import cors from "cors";
import db from "./models/index.js";
//============================= /1. PHẢI IMPORT ROUTER VÀO ĐÂY /===================|
import { tutorialRouter, categoryRouter } from "./routes/index.js";

//===================================================================================|
dotenv.config();

const app = express();
app.use(cors()); // thêm dòng này vào server.js ở backend
app.use(morgan("dev"));
app.use(bodyParser.json());

//====================2. ĐỂ Ý LÀ ĐỀ YÊU CẦU URL / API TRÔNG NTN =====================|
app.use("/tutorials", tutorialRouter);
app.use("/categories", categoryRouter);

//============================================================================
app.use(async (req, res, next) => {
  next(httpError.NotFound());
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.send({
    error: {
      status: error.status || 500,
      message: error.message,
    },
  });
});

app.listen(process.env.PORT, process.env.HOST_NAME, () => {
  console.log(
    `Server is running on port ${process.env.PORT} 
      and at : https://${process.env.HOST_NAME}:${process.env.PORT}`
  );
  db.connectDB();
});
