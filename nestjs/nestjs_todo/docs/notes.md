## Bài 15 : Query param, phân trang, ...

- Dùng @Query để hứng data từ query param từ url
- Dùng page - limit phân trang tránh dữ liệu lớn
- Dùng Http code để trả về đúng status code theo ngữ cảnh

# Chương 3 DTO + Pipe - keiemr soát data từ client

- Chặn sớm để mà còn biết đường mà rollback, tránh vào controller rồi mới xử lý
- thằng Pipe cần biết dữ liệu hợp lệ trông như nào
- DTO là 1 cái khuôn mẫu dữ liệu - là ae cần định nghĩa trước xem ví dụ thằng todo truyền xuống chỉ dc có những field gì, trông như nào, ko nhận gì
- Flow xác minh data đầu vào của thằng NestJS gồm 3 step chính
  - Định nghĩa DTO - body trông như nào?
  - Thêm logic kiểm tra vào cái khuôn mẫu trên bằng lib class-validator - vdu : "title" phải là string và not-null
  - Bật ValidationPipe trong main.ts -> để mà nestjs nó thực thi cho tất cả các route

## Bài 16 : DTO : Kiểm soát đầu vào chặt chẽ hơn

- DTO đơn giản là 1 class dùng để define data client được phép gửi vào hệ thống trông như thế nào.
  Nhấn mạnh là data GỬI VÀO API, không phải data lưu trong DB.

- Ví dụ Entity trong DB có thể có nhiều field như id, title, description, status, createdAt, updatedAt.
  Nhưng khi client tạo mới thì không phải field nào cũng được gửi lên.
  Những field như id, createdAt, updatedAt thường do server tự tạo / tự gán.

- Vậy nên DTO giúp mình kiểm soát rõ:
  client được gửi field nào,
  field đó có kiểu dữ liệu gì,
  field đó có bắt buộc hay không,
  field đó có hợp lệ hay không.

- Tại sao bên ExpressJS mình vẫn dùng object được, còn qua NestJS/TS lại hay tạo class riêng?
  Vì object / interface / type trong TypeScript chủ yếu chỉ check lúc code.
  Khi app chạy thật, mình không gắn được logic validate trực tiếp vào plain object/interface/type.

- Còn class thì tồn tại lúc runtime, nên mình gắn decorator validate được.
  Ví dụ như: title phải là string, không được rỗng, email phải đúng format,...

- Nên DTO trong NestJS thường là class để vừa mô tả shape của input,
  vừa gắn rule validate cho input đó.

=> Chốt:
Entity = dữ liệu trong DB trông như thế nào.
DTO = dữ liệu client được phép gửi vào API trông như thế nào.

Dùng DTO để kiểm soát đầu vào chặt hơn, tránh client gửi thiếu, gửi sai kiểu,
hoặc tự gửi những field đáng lẽ server phải xử lý.

- Nên mỗi hành động sẽ có DTO riêng : createDTO, updateDTO,...

## Bài 17 : Class Validator

- dùng class-transformer (lo việc chuyển đổi data từ request về đúng dạng mình cần ) class-validator(lo việc check data đó hợp lệ hay không) , thiếu 1 trong 2 đều ko được
- hình dung DTO, class validator chỉ là bộ luật giao thông thôi, cần Pipe để thực hiện luật này, Pipe như các chú côg an ấy

## Bài 18 : ValidationPipe (global)

- Pipe : class đứng trước controller, tùy mục đích mà có nhiều loại Pipe khác nhau (validate - transform(chuyển đổi dữ liệu))
-

## Bài 19

- nestjs/mapped-types -> PartialType(truyền vào 1 DTO)

## Bài 23

- trong class thì constructure là 1 func đặc biệt - vì nó tự
  động chạy khi mà một thực thể của class dc tạo ra

## Bài 24 : Hiểu Cơ Chế Đảo Ngược Điều Khiển (Inversion of Control)

- 1 class không nên tự tạo những thứ mà nó phụ thuộc vào
