// import express module
import express, { json } from 'express';
import * as dotenv from 'dotenv';
import {CategoryRouter, ProductRouter} from './routes/index.js';
import connectDB from './database/database.js';

// Thực thi cấu hình ứng dụng sử dụng file .env
dotenv.config();
// Tạo đối tượng app để khởi tạo web container
const app = express();
app.use(json());

// Cấu hình hoạt động routing (định tuyến) các request gửi tới web server
app.get('/', (req, res)=>{
    res.send("Hello World");
})

app.use('/products', ProductRouter);
app.use('/categories', CategoryRouter);


// Khai báo port cho ứng dụng web
const port = process.env.PORT || 8080;

app.listen(port, async()=>{
    connectDB();
    console.log(`Server is running on: http://localhost:${port}`);
});