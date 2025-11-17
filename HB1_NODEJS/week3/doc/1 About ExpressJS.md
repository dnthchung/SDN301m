# ExpressJS

- web framework tối giản cho Node.js, dùng để xây dựng ứng dụng web và API.
- cung cấp routing, middleware, xử lý request/response và tích hợp dễ dàng với nhiều thư viện như mongoose, cors, morgan.

## Tạo 1 api cơ bản

```
// cli :
npm init -y
npm install express
```

```js
// file server.js
const express = require("express");
const app = express();

// Middleware built-in để parse JSON body
app.use(express.json());

// Route đơn giản
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// khởi động server + lắng nghe (listen) các request HTTP trên một port cụ thể.
app.listen(3000, () => {
  console.log("Server is running");
});
```

# Middleware

- các func này có quyền truy cập vào request + response object và function next trong chu trình xử lý request-response của ứng dụng.
- Nếu middleware không kết thúc chu trình thì phải gọi next(), để chuyển quyền xử lý cho middleware kế tiếp, nếu không request sẽ bị treo, pending.

```js
/**
 * vdu:
 * - Middleware logging đơn giản in ra console khi request đi qua:
 * - Mỗi request đến app sẽ in ra "LOGGED".
 * */
const myLogger = function (req, res, next) {
  console.log("LOGGED");
  next();
};

app.use(myLogger);
```
