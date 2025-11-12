### Cách NodeJS xử lý concurrency

- Node.js xử lý concurrency bằng mô hình Event Loop kết hợp non-blocking I/O.

- JavaScript trong Node.js chỉ chạy trên một luồng duy nhất (single thread),
  nhưng nhờ libuv và thread pool, các tác vụ I/O (như đọc file, truy cập network, DNS, crypto…) được offload xuống hệ điều hành hoặc thread pool để chạy song song.

- Khi tác vụ hoàn tất, callback của nó được đưa trở lại Event Loop, và Node.js xử lý chúng tuần tự trên main thread.

=> Nhờ đó, Node.js có thể xử lý hàng nghìn kết nối đồng thời, mà không cần tạo nhiều thread cho mỗi request.

### Event loop (EL)

- là cơ chế giúp Node.js (single-thread) chạy async bằng cách tách xử lý I/O ra kernel, rồi điều phối callback qua 6 phase.

#### Cấu trúc EL

- Mỗi chu kỳ (tick) của Event Loop đi qua các phases:

  > timers → pending → poll → check → close

- Details
  | Phase | Mô tả | Ví dụ |
  | :--- | :--- | :--- |
  | 1. timers | Xử lý các callback của setTimeout() và setInterval() nếu thời gian chờ đã hết. “After at least N ms” chứ không đảm bảo chính xác 100%. | `setTimeout(()=>console.log('A'), 1000)` |
  | 2. pending callbacks | Xử lý các callback I/O bị “trì hoãn” (ví dụ lỗi TCP, DNS lookup, …). Thường là phần nội bộ hệ thống. | Không dùng trực tiếp trong JS |
  | 3. idle, prepare | Dùng nội bộ libuv để chuẩn bị dữ liệu cho phase tiếp theo. | (Không tác động trong code JS) |
  | 4. poll | Giai đoạn quan trọng nhất: <br> - Lấy sự kiện I/O mới từ OS kernel <br> - Xử lý callback của I/O (như fs.readFile, http, net, …) <br> - Nếu queue rỗng, Node có thể ngủ chờ hoặc chuyển sang phase khác. | `fs.readFile('data.txt', cb)` |
  | 5. check | Chạy callback đã đăng ký qua setImmediate() (chạy ngay sau poll). | `setImmediate(()=>console.log('done'))` |
  | 6. close callbacks | Khi socket hoặc handle đóng ('close' event). | `socket.on('close', cb)` |

#### Notes

- Trong NodeJS

  - Thread : Nơi chạy code JS, điều phối logic
  - Thread pool : Nhóm luồng Thread phụ để xử lý I/O blocking song song
  - Thư viện libuv : Tổ chức Event Loop, quản lý thread pool, giao tiếp với OS

- Kernel :

  - th ku này là phần lõi, trung tâm của hệ điều hành, nó quản lý phần cứng và tài nguyên hệ thống + cung cấp giao diện cho phần mềm giao tiếp với phần cứng.
  - NÓ KP HỆ ĐIỀU HÀNH
  - Tóm lại, kernel là phần cốt lõi của hệ điều hành, còn Windows là hệ điều hành chứa kernel.

- `setTimeout()` vs `setInterval()`
  | | `setTimeout()` | `setInterval()` |
  | --------------------------- | ---------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
  | **Số lần chạy** | Chạy **một lần duy nhất** sau `delay` | Chạy **lặp lại liên tục** sau mỗi `delay` |
  | **Cách hoạt động** | Khi hết `delay`, callback được đưa vào **timers queue** → chạy xong là hết | Sau mỗi lần chạy, Node.js **đặt lại một timer mới** với cùng `delay` |
  | **Dừng lại** | Không cần dừng (tự kết thúc sau 1 lần) | Phải dùng `clearInterval(id)` để dừng |
  | **Vị trí trong Event Loop** | `timers` phase | `timers` phase |
  | **Dễ bị lệch (drift)** | Không đáng kể (chỉ chạy 1 lần) | Dễ bị **trễ dần** nếu callback mất thời gian lâu hơn `delay` |
  | **Dùng khi** | Cần chạy **1 lần sau một khoảng trễ** (ví dụ delay request, animation delay, v.v.) | Cần **chạy lặp đều đặn** (polling, heartbeat, auto-save, logging, v.v.) |
