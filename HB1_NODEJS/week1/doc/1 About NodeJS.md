- Nodejs là môi trường chạy JS - runtime environment, kh phải framework.
- Hiểu nôm na :
  => Nếu browser dùng JS để control Ui, thao tác với DOM  
  => NodeJS dùng JS để control server, các file hệ thống, mạng (làm client call thằng api của server khác, tcp - real time,..) ,...

- Strict Mode là mode “nghiêm khắc” của JS để code an toàn hơn, rõ ràng hơn, ít bug ngầm hơn.
  Nói cáhc khác :

  - JS bth hơi “dễ dãi”: cho phép dùng biến chưa khai báo, trùng tên, gán lung tung, lỗi mà không báo.
  - Strict Mode bắt JS tuân thủ đúng luật, nếu sai là báo lỗi ngay.

- Ví dụ :
  // Không strict
  x = 10; // ok nma tạo biến global (rất nguy hiểm)  
  console.log(x);

  // Strict
  "use strict";
  x = 10; // Lỗi: x is not defined

- Conventions

Đặt tên

- Biến, hàm: `lowerCamelCase` → `getUserData`
- Class, constructor: `UpperCamelCase` → `UserService`
- File/thư mục: `kebab-case` → `user-service.js`
- Hằng số: `UPPER_SNAKE_CASE` → `MAX_CONNECTIONS`

Cú pháp và cấu trúc

- Dùng `===`, `!==` (so sánh nghiêm ngặt)
- Dùng `const` và `let`, tránh `var`
- Mỗi hàm chỉ nên làm một việc
- Dùng nháy đơn `' '` cho chuỗi
- Kết thúc lệnh bằng dấu `;`

Tổ chức file

- Mỗi file chứa một module hoặc chức năng cụ thể
- Thư mục chia theo vai trò:
  `controllers/`, `routes/`, `models/`, `services/`

Format và indent

- Thụt lề 2 khoảng trắng
- Dòng không dài quá 100 ký tự
- Giữ khoảng trắng hợp lý giữa các khối logic

Xử lý lỗi

- Luôn dùng `try/catch` hoặc `.catch()`
- Không bỏ qua lỗi (swallow error)

Async/Await

- Ưu tiên dùng `async/await` thay vì callback
- Bắt lỗi đúng cách bằng `try/catch`

Comment và tài liệu

- Chỉ comment phần logic phức tạp
- Dùng JSDoc để mô tả hàm và class

Công cụ hỗ trợ

- Dùng ESLint (Airbnb, StandardJS) để kiểm tra quy tắc
- Dùng Prettier để tự động format code
