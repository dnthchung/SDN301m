// import express module
import express, { json } from 'express';
import * as dotenv from 'dotenv';
import {CategoryRouter, ProductRouter} from './routes/index.js';
import connectDB from './database/database.js';
import createError from 'http-errors';
import cors from 'cors';

// Thực thi cấu hình ứng dụng sử dụng file .env
dotenv.config();
// Tạo đối tượng app để khởi tạo web container
const app = express();
app.use(json());
app.use(cors());

// Cấu hình hoạt động routing (định tuyến) các request gửi tới web server
app.get('/', (req, res)=>{
    res.send("Hello World");
})

app.use('/products', ProductRouter);
app.use('/categories', CategoryRouter);


// Khai báo port cho ứng dụng web
const port = process.env.PORT || 8080;

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

app.listen(port, async()=>{
    connectDB();
    console.log(`Server is running on: http://localhost:${port}`);
});