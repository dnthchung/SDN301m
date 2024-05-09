import express from "express";
import morgan from "morgan";
import createError from "http-errors";
import dotenv from "dotenv";
import connectDB from "./helpers/init_mongodb.js";
import AuthRouter from "./routes/Auth.js";
import {verifyAccessToken} from './helpers/jwt_helper.js';
import GenreRouter from "./routes/Genre.js";
import MovieRouter from "./routes/Movie.js";

dotenv.config();
const PORT = process.env.PORT;

const app = express();
// Ghi log khi cos request call api
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Router:
app.get("/", verifyAccessToken, async(req, res, next)=>{
    //console.log(req.headers['authorization']);
    res.send("Hello from Express");
});

app.use('/genre', GenreRouter);
app.use('/movie', MovieRouter);

app.use("/auth", AuthRouter);

// Chỉ định middleware kiểm soát requests không hợp lệ
app.use(async(req, res, next)=>{
    next(createError.NotFound()); // Có thể bổ sung message trong hàm NotFound
})

app.use((err, req, res, next)=>{
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        }
    });
});


app.listen(PORT, ()=>{
    connectDB();
    console.log(`Server running on port ${PORT}`);
})