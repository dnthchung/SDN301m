# Folder struc thường dùng

```
project/
  package.json
  src/
    app.js
    server.js
    config/
      env.js
      db.js
    routes/
      index.js
      user.route.js
    controllers/
      user.controller.js
    services/
      user.service.js
    models/
      user.model.js
    middlewares/
      auth.middleware.js
      error.middleware.js
    utils/
      logger.js

```

- **Flow:** Route $\rightarrow$ Controller $\rightarrow$ Service $\rightarrow$ Model

  - **Route:** Định nghĩa URL và method, map sang `Controller`.
  - **Controller:** Nhận request, validate input đơn giản, gọi `service`, trả response.
  - **Service:** Chứa business logic (xử lý dữ liệu, gọi nhiều `model`, xử lý nghiệp vụ).
  - **Model:** Làm việc với `database` (Mongoose, Prisma, raw SQL…).

- **Các thành phần sp:**
  - **Middleware:** Xử lý cross-cutting (auth, log, validate, error).
  - **Config:** Config env, DB, constant.
  - **Utils:** Hàm helper dùng chung.
