# RxJS Learning Pet Project

## Tổng quan

Pet project này dùng để học RxJS thông qua một ứng dụng nhỏ có luồng dữ liệu bất đồng bộ rõ ràng, ví dụ: tìm kiếm sản phẩm, quản lý task, dashboard realtime hoặc chat mini.

Mục tiêu chính là luyện cách tư duy theo stream thay vì xử lý từng sự kiện rời rạc.

## Mục tiêu học tập

- Hiểu `Observable`, `Observer`, `Subscription` và vòng đời của stream.
- Biết cách tạo stream từ event, HTTP request, timer hoặc dữ liệu giả lập.
- Sử dụng các operator phổ biến như `map`, `filter`, `debounceTime`, `switchMap`, `mergeMap`, `concatMap`, `combineLatest`, `catchError`.
- Xử lý loading, error, retry và hủy request cũ.
- Quản lý state đơn giản bằng `BehaviorSubject` hoặc `Subject`.

## Gợi ý tính năng

- Ô tìm kiếm có `debounceTime` để tránh gọi API liên tục.
- Gọi API bằng `switchMap` để tự hủy request cũ khi keyword thay đổi.
- Bộ lọc và sắp xếp dữ liệu kết hợp bằng `combineLatest`.
- Hiển thị trạng thái `loading`, `empty`, `error`.
- Nút refresh hoặc auto refresh bằng `timer` / `interval`.
- Cleanup subscription khi component bị destroy.

## Kết quả mong muốn

Sau project này, người học có thể đọc và viết các luồng RxJS cơ bản trong Angular, hiểu khi nào nên dùng operator nào, và biết cách xử lý các case thực tế như search, filter, polling, error handling và state sharing giữa components.
