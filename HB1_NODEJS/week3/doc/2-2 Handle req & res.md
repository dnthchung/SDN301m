# Tóm tắt nội dung

- A. Tìm hiểu cách xử lý request: request.params, request.query, request.body
- B. Tìm hiểu cách validate input: type của các field, các constraint, ...
- C. Nâng cao: tìm hiểu về sercurity, các loại tấn công có thể thông qua input truyền cùng request
- D. Tìm hiểu về JSON response

# A. Cách xử lý request

1. `req.params`

- Lấy dữ liệu từ **URL dạng /:something**
  Dùng cho: id, slug, mã tài nguyên.

2. `req.query`

- Lấy dữ liệu từ **query string** sau dấu `?`
  Dùng cho: filter, search, pagination.

3. `req.body`

- Lấy dữ liệu từ **body** khi dùng POST, PUT, PATCH
  Dùng cho: tạo mới hoặc cập nhật dữ liệu.

  | Loại dữ liệu | Trích từ   | Ví dụ URL     | Cách lấy         |
  | ------------ | ---------- | ------------- | ---------------- |
  | params       | /users/:id | /users/10     | `req.params.id`  |
  | query        | ?page=2    | /users?page=2 | `req.query.page` |
  | body         | JSON body  | POST /users   | `req.body.name`  |

```js
const express = require("express");
const app = express();
app.use(express.json());

// URL: /users/10
app.get("/users/:id", (req, res) => {
  const params = req.params; // { id: "10" }
  res.json({ params });
});

// URL: /users?page=2&limit=5
app.get("/users", (req, res) => {
  const query = req.query; // { page: "2", limit: "5" }
  res.json({ query });
});

// POST /users
// Body: { "name": "Chung", "age": 23 }
app.post("/users", (req, res) => {
  const body = req.body; // { name: "Chung", age: 23 }
  res.json({ body });
});

app.listen(3000);
```

# B. Validate Input

- Input nên được validate tại tầng middleware hoặc controller, thường kiểm tra:

  - Type: string, number, boolean, array, object
  - Bắt buộc / không bắt buộc: required / optional
  - Độ dài: min, max (vd: title ≥ 3 ký tự)
  - Giá trị: min, max number (vd: year ≥ 1900)
  - Format: email, số điện thoại, regex, enum,…

- Ngoài ra có thể udngf thư biên bên thứ 3 như: zod, yup, joi (Nên dùng)
