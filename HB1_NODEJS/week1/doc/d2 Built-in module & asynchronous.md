## Built-in module (Core module)

- Là các thư viện có sẵn trong NodeJS,dc v iết = C/C++, khi máy local cài Node về là đã dùng được rồi, ko cần npm i
- Cung cấp "xương sống" để xây framework khác như Express, NestJS, Fastify
- Ví dụ ExpressJS:

  - Là web framework nhẹ viết bằng JavaScript,
  - No dc build trên nền tảng các built-in module của NodeJS, đặc biệt là http và events.

  > `require('tên module')` là dùng dc ngay

- Danh sách các built-in phổ biến :
  | Nhóm chức năng | Module | Mô tả |
  | ------------------------ | ------------------------------------------------------------------- | ------------------------------------------------------- |
  | **File hệ thống** | `fs` | Đọc, ghi, sửa, xóa file |
  | **Đường dẫn** | `path` | Xử lý, nối, chuẩn hóa đường dẫn file |
  | **Hệ điều hành** | `os` | Lấy thông tin hệ điều hành (RAM, CPU, hostname,...) |
  | **HTTP / HTTPS** | `http`, `https` | Tạo server và client HTTP(S) thuần |
  | **Sự kiện (event)** | `events` | Tạo, lắng nghe, phát ra event (event emitter pattern) |
  | **Luồng dữ liệu** | `stream` | Đọc/ghi dữ liệu từng phần (video, file lớn, network...) |
  | **Bộ đệm** | `buffer` | Làm việc với dữ liệu nhị phân (binary) |
  | **Tiện ích** | `util` | Các hàm hỗ trợ: debug, promisify, format... |
  | **Process** | `process` | Lấy in4, env, args, thoát chương trình |

  > ví dụ : `const fs = require('fs');` , `const http = require('http');`

## Asynchronous: callback, promise, async/await

### Callback

- là khi 1 func A được truyền vào như 1 đối số cho 1 func B khác và func A này sẽ được gọi lại (callback) khi "các tác vụ" nào đó trong B được hoàn thành

  - Tưởng tượng bạn gọi điện cho tiệm bánh để đặt một chiếc bánh sinh nhật.
  - Bạn nói với tiệm bánh: "Làm cho tôi cái bánh này nhé, xong thì gọi lại số này để tôi đến lấy."
    - Cái "số này" chính là callback function (A) của bạn.
    - Bạn đưa cho tiệm bánh (Main function - B) một cách để họ liên lạc lại với bạn (gọi lại hàm callback) khi tác vụ/công việc (làm bánh) hoàn thành.

- Nhược : Khi có nhiều tác vụ bất đồng bộ phụ thuộc vào nhau, việc sử dụng callback lồng nhau sẽ tạo ra cấu trúc code khó đọc => khó handle, dễ gây lỗi, dc gọi là "Callback Hell" hoặc "Pyramid of Doom".

  - Ví dụ callback hell :
    - Giờ bạn muốn:
      - "Đặt bánh xong, nếu ngon thì đặt thêm trà sữa,
      - xong trà sữa thì nếu trà sữa ngon thì abcxyz vân vân..."
        => quá nhiều tác vụ lồng nhau để đi đến bước gọi điện.

### Promise

- Để giải quyết mớ rắc rối trên, tiệm bánh giờ đây có một thông báo mới:

  > "Chúng tôi hứa bánh của bạn sẽ xong, dù done hay fail, chúng tôi sẽ thông báo rõ ràng." => Cái lời hứa này chính là một Promise.

- Cách hoạt động :

  - Khi bạn đặt bánh, tiệm bánh sẽ đưa cho bạn một "phiếu hẹn" (Promise).
  - Phiếu này có 3 trạng thái:
    - Pending (Đang chờ): Bánh đang được làm.
    - Fulfilled (Hoàn thành): Bánh đã xong và ngon lành (lời hứa được giữ).
    - Rejected (Từ chối): Bánh bị hỏng (lời hứa bị phá vỡ).
      > Bạn chỉ việc xem cái phiếu này và dùng `.then()` để làm gì đó khi bánh xong, hoặc `.catch()` để xử lý nếu bánh bị hỏng.

### Async / await

- Async/Await là "level" cao nhất, hiện đại nhất, giúp bạn viết code bất đồng bộ mà trông y hệt code đồng bộ. Cứ như bạn đang nói chuyện trực tiếp với tiệm bánh vậy, từng bước một.

  - async: Đặt trước một hàm để nói rằng "hàm này sẽ thực hiện một số việc bất đồng bộ". Hàm async luôn trả về một Promise.
  - await: Chỉ dùng bên trong hàm async. Nó nói: "Đợi ở đây cho đến khi tác vụ bất đồng bộ này (Promise) hoàn thành, rồi mới đi tiếp."

- Cách hạot động :
  - Async/Await giống như bạn ngồi tại quán bánh, đợi cho đến khi bánh xong, nhưng không làm kẹt cửa hàng, vì quán (NodeJS) vẫn tiếp tục phục vụ khách khác trong lúc bạn chờ.

### Kết luận

- Callback: Là cách cơ bản nhất, nhưng dễ dẫn đến "mớ bòng bong" (Callback Hell) khi có nhiều tác vụ phụ thuộc.
- Promise: Cung cấp một cách chuẩn hóa và dễ quản lý hơn để xử lý bất đồng bộ, giải quyết vấn đề Callback Hell bằng cách dùng chuỗi các hành động.
- Async/Await: Là cú pháp "tối thượng" hiện nay, giúp viết code bất đồng bộ trông giống hệt code đồng bộ, cực kỳ dễ đọc và dễ bảo trì, dựa trên nền tảng của Promise.

| Loại            | Cách hoạt động                                                                                                                                                           | Ví dụ tiệm bánh                                   |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------- |
| **Callback**    | Bạn **đặt bánh** và **đưa số điện thoại** để họ gọi lại khi xong.                                                                                                        | “Làm xong alo tôi nha!”                           |
| **Promise**     | Bạn **đặt bánh** và **nhận phiếu hẹn**. Bạn có thể cài sẵn hành động `.then()` khi bánh xong, `.catch()` nếu lỗi.                                                        | “Tôi có phiếu hẹn, tôi xem kết quả khi nào xong.” |
| **Async/Await** | Bạn **ngồi tại quán, uống cà phê đợi**, nhưng vẫn có thể để quán phục vụ người khác. Khi bánh xong, bạn **đứng dậy lấy ngay** - không cần callback, không cần `.then()`. | “Tôi chờ ở đây cho đến khi bánh xong.”            |
