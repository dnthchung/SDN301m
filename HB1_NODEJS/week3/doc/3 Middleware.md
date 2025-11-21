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

---

# B. Server Response & HTTP Status Codes

> HTTP Status Code là con số 3 chữ số mà Server trả về để báo cho Client biết kết quả của Request.

## 1. nhớ nhanh (5 nhóm)

| Nhóm    | Ý nghĩa                       |
| :------ | :---------------------------- |
| **1xx** | Informational (Thông tin)     |
| **2xx** | **Success (Thành công)**      |
| **3xx** | Redirection (Điều hướng)      |
| **4xx** | **Client Error (Lỗi Client)** |
| **5xx** | **Server Error (Lỗi Server)** |

## 2. Các Status Code phổ biến

### Nhóm 2xx: Thành công (Success)

| Code    | Tên            | Ý nghĩa & Khi nào dùng                                                                                            |
| :------ | :------------- | :---------------------------------------------------------------------------------------------------------------- |
| **200** | **OK**         | **Thành công chung.** Dùng cho `GET`, `PUT`, `PATCH` khi trả về dữ liệu.                                          |
| **201** | **Created**    | **Tạo mới thành công.** Bắt buộc dùng sau khi `POST` tạo database (VD: Tạo 1 Todo mới).                           |
| **204** | **No Content** | **Thành công nhưng không trả về gì.** Thường dùng cho `DELETE` hoặc `PUT` (cập nhật xong không cần trả lại data). |

### Nhóm 4xx: Lỗi do Client (Client Errors)

_Client cần sửa lại request mới gửi lại được._

| Code    | Tên                      | Ý nghĩa & Khi nào dùng                                                                                                                     |
| :------ | :----------------------- | :----------------------------------------------------------------------------------------------------------------------------------------- |
| **400** | **Bad Request**          | **Lỗi chung chung.** Dữ liệu gửi lên không đọc được (sai JSON, thiếu field bắt buộc nhưng không cụ thể).                                   |
| **401** | **Unauthorized**         | **Chưa đăng nhập.** Client chưa gửi Token hoặc Token hết hạn. <br> _Cần: Redirect về trang Login._                                         |
| **403** | **Forbidden**            | **Không có quyền.** Đã đăng nhập rồi, nhưng user này không được phép làm hành động này (VD: User thường đòi xóa Admin).                    |
| **404** | **Not Found**            | **Không tìm thấy.** Sai đường dẫn API hoặc tìm ID không tồn tại trong Database.                                                            |
| **409** | **Conflict**             | **Xung đột dữ liệu.** Thường dùng khi tạo trùng lặp (VD: Đăng ký email đã tồn tại).                                                        |
| **422** | **Unprocessable Entity** | **Dữ liệu không hợp lệ.** Format đúng nhưng sai logic (VD: Password ngắn quá, Email không đúng định dạng). Rất hay dùng khi Validate Form. |
| **429** | **Too Many Requests**    | **Spam nhiều quá.** Gửi quá nhiều request trong thời gian ngắn (Rate Limit).                                                               |

### Nhóm 5xx: Lỗi do Server (Server Errors)

_Client không làm gì sai cả, lỗi ở hệ thống._

| Code    | Tên                       | Ý nghĩa & Khi nào dùng                                                                                 |
| :------ | :------------------------ | :----------------------------------------------------------------------------------------------------- |
| **500** | **Internal Server Error** | **Lỗi nội bộ.** Code bị crash, exception không bắt được, kết nối DB thất bại. (Lỗi "Catch-all").       |
| **502** | **Bad Gateway**           | **Cổng lởm.** Server nhận được phản hồi lỗi từ server khác (VD: Nginx không gọi được vào Node.js app). |
| **503** | **Service Unavailable**   | **Server bận.** Server đang bảo trì hoặc quá tải (Overload), không thể xử lý lúc này.                  |

## 3. Best Practices (Lưu ý khi code) - Ai nói

### 1. Đừng bao giờ "nói dối" với code 200

**Sai:** Trả về `Status 200 OK` nhưng body lại là `{ "error": "Lỗi rồi" }`.
**Hậu quả:** Frontend/Axios sẽ nghĩ là thành công -\> code xử lý sai luồng.
**Đúng:** Trả về đúng mã lỗi (400, 500) để Frontend bắt vào `catch`.

### 2. Phân biệt 401 và 403

- **401 (Unauthorized):** "Bạn là ai?" (Chưa có vé vào cổng).
- **403 (Forbidden):** "Tôi biết bạn là ai, nhưng khu vực này cấm vào" (Có vé nhưng không được vào phòng VIP).

### 3. Bảo mật lỗi 500

Khi trả về lỗi **500** cho Client, chỉ nên gửi message: `"Something went wrong, please try again"`.
**Tuyệt đối không** gửi nguyên cả đoạn **Stack Trace** (dòng lỗi cụ thể trong code) ra ngoài, hacker có thể đọc được cấu trúc file của bạn.
