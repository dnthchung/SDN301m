# Tóm tắt nội dung

- A. Tại sao cần sử dụng middleware? Vị trí của middleware trong flow request -> response
- B. Status code khi response và best practices sử dụng

# A. Tại sao cần sử dụng middleware? Vị trí của middleware trong flow request -> response

- Middleware là các hàm trung gian chạy trong quá trình xử lý request.
- Mỗi middleware nhận vào `(req, res, next)` và có quyền:

  - xử lý một phần logic rồi `next()` để đi tiếp
  - chặn và kết thúc request tại đó
  - hoặc trả lỗi

## 2. Tại sao cần sử dụng middleware?

1. Tách logic chung ra khỏi controller  
   Ví dụ: validate input, authenticate, logging, parse body, CORS,…

2. Tái sử dụng nhiều nơi  
   Một middleware có thể dùng cho toàn bộ ứng dụng hoặc từng route.

3. Tạo pipeline xử lý rõ ràng  
   Các middleware chạy tuần tự giúp code dễ quản lý, dễ mở rộng.

4. Chuẩn hóa xử lý lỗi  
   Một error middleware duy nhất giúp gom lỗi về một nơi.

## 3. Vị trí trong flow request -> response

Flow trong ExpressJS:

```
Client Request
↓
Application-level middleware (auth, logging, validate, cors, json parser)
↓
Router-level middleware (chỉ chạy cho route nhất định)
↓
Route Handler / Controller (logic chính)
↓
Error-handling middleware
↓
Server Response
```

# B. Server response

- src : https://socola-wiki.netlify.app/software-development/web-architecture/http/http-status-code
