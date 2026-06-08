# Vòng đời (Lifecycle) của 1 Request trong NestJS

Tài liệu này mô tả luồng xử lý đầy đủ của một HTTP request khi đi vào ứng dụng NestJS, từ lúc client gọi `@Post()` cho đến khi trả về `Response`.

## 1. Sơ đồ tổng quan

```
                      ┌─────────────────────────────────────────────────────────────────────┐
                      │                          NestJS Application                          │
                      │                                                                       │
@POST()  ──────────▶  │  MIDDLEWARE → GUARD → PIPE → CONTROLLER → SERVICE → REPOSITORY        │  ──────────▶  Response
 (request)            │   Ghi Log    Kiểm tra  Kiểm   Khớp route   Logic    Truy cập DB        │   (response)
                      │              user      input  tương ứng    nghiệp vụ                   │
                      │                                                                       │
                      │                       FILTER (bắt lỗi)  ·  INTERCEPTOR (serialize)     │
                      └─────────────────────────────────────────────────────────────────────┘
```

## 2. Thứ tự các thành phần & vai trò

| # | Thành phần      | Nhiệm vụ                                | Ví dụ thực tế                          |
|---|-----------------|-----------------------------------------|----------------------------------------|
| 1 | **Middleware**  | Ghi log, gắn dữ liệu vào request        | Logger, CORS, cookie-parser            |
| 2 | **Guard**       | Kiểm tra user (xác thực / phân quyền)   | `AuthGuard`, `RolesGuard`              |
| 3 | **Interceptor** (before) | Xử lý trước khi vào handler    | Bắt đầu đo thời gian, transform input  |
| 4 | **Pipe**        | Kiểm tra & chuyển đổi input (validation)| `ValidationPipe`, `ParseIntPipe`       |
| 5 | **Controller**  | Khớp request tới route tương ứng        | `@Post('todos')`                       |
| 6 | **Service**     | Thực thi logic nghiệp vụ                | `TodoService.create()`                 |
| 7 | **Repository**  | Truy cập database                       | `TodoRepository`, Mongoose Model       |
| 8 | **Interceptor** (after) | Serialize / biến đổi dữ liệu trả về | Bọc response `{ data, statusCode }` |
| 9 | **Filter**      | Bắt và xử lý lỗi (exception)            | `HttpExceptionFilter`                  |

> ⚠️ **Lưu ý về thứ tự thực tế trong NestJS:**
> Thứ tự chính xác là **Middleware → Guard → Interceptor (before) → Pipe → Controller/Handler → Interceptor (after) → Filter**.
> `Interceptor` chạy **2 lần**: một lần *trước* handler và một lần *sau* handler (nó "bao" quanh handler).
> `Filter` chỉ kích hoạt khi có **exception** được ném ra ở bất kỳ bước nào.

## 3. Giải thích từng bước

### 1️⃣ Middleware — *Ghi Log*
- Chạy **đầu tiên**, gần với tầng HTTP nhất (giống middleware của Express).
- Truy cập được `request` / `response` thô.
- Dùng để: ghi log, đo thời gian, xử lý CORS, parse cookie, gắn `req.user`...
- Không biết được route handler nào sẽ được gọi.

### 2️⃣ Guard — *Kiểm tra user*
- Quyết định request có được phép đi tiếp hay không (trả về `true`/`false`).
- Dùng cho **Authentication** (bạn là ai?) và **Authorization** (bạn có quyền không?).
- Nếu trả `false` → NestJS tự ném `ForbiddenException`.

### 3️⃣ Pipe — *Kiểm tra input*
- **Validation**: kiểm tra dữ liệu đầu vào có hợp lệ không (vd dùng `class-validator` + DTO).
- **Transformation**: chuyển đổi kiểu dữ liệu (vd string `"123"` → number `123`).
- Nếu dữ liệu sai → ném `BadRequestException`.

### 4️⃣ Controller — *Khớp request tới route tương ứng*
- Nhận request đã được validate, xác định đúng handler theo HTTP method + path.
- **Mỏng** (thin): chỉ điều phối, không chứa logic nghiệp vụ.

### 5️⃣ Service — *Thực thi logic nghiệp vụ*
- Chứa toàn bộ business logic.
- Được inject vào Controller thông qua Dependency Injection (DI).
- Tái sử dụng được, dễ test (unit test).

### 6️⃣ Repository — *Truy cập database*
- Lớp giao tiếp trực tiếp với database (CRUD).
- Tách biệt logic nghiệp vụ khỏi chi tiết truy vấn DB.
- Ví dụ: Mongoose Model, TypeORM Repository.

### 7️⃣ Interceptor — *Serialize data*
- "Bao" quanh handler → chạy cả **trước** và **sau**.
- Sau handler: biến đổi / chuẩn hóa dữ liệu trả về (vd bọc thành `{ statusCode, data }`), ẩn field nhạy cảm, cache, logging response.

### 8️⃣ Filter — *Bắt lỗi*
- Bắt mọi **exception** chưa được xử lý.
- Định dạng lại response lỗi cho thống nhất (vd `{ statusCode, message, timestamp, path }`).
- Ví dụ: `HttpExceptionFilter`, `AllExceptionsFilter`.

## 4. Ví dụ minh họa với 1 request `POST /todos`

```
Client gửi:  POST /todos   { "title": "" }   (kèm token sai)

1. Middleware  → ghi log: "POST /todos - 10:00:00"
2. Guard       → kiểm tra token → ❌ token sai → ném ForbiddenException
                 └─▶ Filter bắt lỗi → trả về 403 { message: "Forbidden" }

------------------------------------------------------------

Client gửi:  POST /todos   { "title": "Học NestJS" }   (token đúng)

1. Middleware  → ghi log
2. Guard       → token hợp lệ ✅
3. Pipe        → validate DTO: title không rỗng ✅
4. Controller  → TodosController.create(dto)
5. Service     → TodosService.create() xử lý logic
6. Repository  → lưu vào MongoDB
7. Interceptor → bọc kết quả: { statusCode: 201, data: {...} }
8. Response    → trả 201 về client
```

## 5. Tóm tắt nhanh (1 câu)

> **Middleware** ghi log → **Guard** chặn cửa → **Pipe** lọc input → **Controller** điều phối → **Service** xử lý nghiệp vụ → **Repository** đụng DB → **Interceptor** gói dữ liệu → **Filter** dọn lỗi → **Response**.
