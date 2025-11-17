# Các loại API Style

API style là cách tổ chức, thiết kế và giao tiếp giữa client và server. Mỗi style có triết lý riêng của nó, cách biểu diễn dữ liệu khác nhau và phù hợp với từng tình huống.

## 1. REST (Representational State Transfer)

REST là phong cách thiết kế API dựa trên tài nguyên (resource) và sử dụng HTTP method đúng chuẩn.

### Đặc điểm

- Dựa trên **resource**, URI là **danh từ số nhiều**
  Vdu: `/users`, `/users/1`
- Dùng hành động qua HTTP method: GET, POST, PUT, PATCH, DELETE
- Stateless (mỗi request độc lập)
- Trả về JSON phổ biến nhất
- Dùng HTTP status code chuẩn

### Vdu

```
GET    /api/users
POST   /api/users
GET    /api/users/1
DELETE /api/users/1
```

### Khi dùng

- Backend web thông thường
- API CRUD
- Hệ thống dễ mở rộng, đơn giản

---

## 2. RESTful

RESTful là **REST được áp dụng đúng chuẩn**, chặt chẽ và đầy đủ.
Nói cách khác: REST là khái niệm, RESTful là mức độ tuân thủ.

### RESTful đề cao:

- Đúng quy tắc resource
- Không dùng action trong URL
  Sai: `/api/getUser`
  Đúng: `/api/users/1`
- Sử dụng status code chính xác
- Dữ liệu trả về có cấu trúc rõ ràng (data, meta, errors)

---

## 3. GraphQL

GraphQL là query language do Facebook phát triển.
Client **tự định nghĩa cấu trúc dữ liệu muốn lấy**.

### Đặc điểm

- Chỉ dùng **1 endpoint duy nhất**: `/graphql`
- Client muốn bao nhiêu field thì server trả đúng bấy nhiêu
- Tránh over-fetching và under-fetching
- Tốt cho hệ thống lớn, nhiều quan hệ dữ liệu

### Vdu query

```graphql
query {
  user(id: 1) {
    id
    name
    email
  }
}
```

### Khi dùng

- App lớn, yêu cầu linh hoạt dữ liệu (mobile app, dashboard)
- Nhiều entity liên kết phức tạp

---

## 4. RPC (Remote Procedure Call)

RPC tập trung vào **hành động (function)** thay vì tài nguyên.

### Đặc điểm

- URL mang tính “gọi hàm”
- Gần giống gọi hàm từ xa
- Payload thường nhỏ, ít cấu trúc phức tạp

### Vdu

```
POST /api/user.getProfile
POST /auth.login
POST /order.create
```

### Khi dùng

- Hệ thống nội bộ
- Microservices giao tiếp HTTP/JSON hoặc gRPC
- Tác vụ ngắn, tốc độ cao

---

## 5. gRPC

gRPC là dạng RPC hiệu suất cao dùng HTTP/2 và Protocol Buffers.

### Đặc điểm

- Hiệu suất cao hơn REST (binary data)
- Hỗ trợ streaming
- Dễ dùng trong microservice
- Không trả JSON

### Vdu (proto file)

```proto
service UserService {
  rpc GetUser(GetUserRequest) returns (GetUserResponse);
}
```

### Khi dùng

- Microservices
- Ứng dụng yêu cầu tốc độ cao
- Truyền dữ liệu giữa server-server

---

## 6. SOAP (Simple Object Access Protocol)

SOAP là chuẩn API cũ hơn, dựa vào XML.

### Đặc điểm

- Format bắt buộc: XML
- Hỗ trợ bảo mật WS-Security
- Chặt chẽ, có schema
- Verbose (nhiều dữ liệu thừa)

### Khi dùng

- Hệ thống ngân hàng
- Enterprise lâu đời
- Hệ thống chính phủ

---

## 7. WebSocket API (Realtime)

Không phải API style truyền thống nhưng hay dùng cho realtime.

### Đặc điểm

- Giao tiếp 2 chiều client ↔ server
- Không theo pattern GET/POST
- Dùng trong chat, game, realtime dashboard

---
