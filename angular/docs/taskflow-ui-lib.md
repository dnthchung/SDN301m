# TaskFlow UI Library

## Recommended UI Library

```txt
Angular Material
```

TaskFlow nên dùng Angular Material làm UI library chính.

Lý do: project này tập trung học RxJS, Angular Reactive Forms, async flow và state management. Vì vậy không nên mất quá nhiều thời gian tự xây dựng UI component từ đầu.

---

# 1. Vì sao chọn Angular Material

## Phù hợp với Angular

Angular Material được xây dựng riêng cho Angular, nên tích hợp tốt với:

* Standalone Component
* Reactive Forms
* Angular Router
* HttpClient flow
* Angular CDK

## Có sẵn component cần thiết

TaskFlow cần nhiều UI pattern phổ biến như:

* form login
* search input
* filter dropdown
* dialog tạo/sửa task
* snackbar notification
* loading spinner
* task card
* drag and drop board

Angular Material đã có sẵn phần lớn các component này.

## Tập trung học RxJS

Mục tiêu chính của project là:

```txt
Học cách nghĩ theo stream.
```

Dùng Angular Material giúp giảm thời gian xử lý UI cơ bản, để tập trung vào:

* stream composition
* request cancellation
* shared state
* optimistic update
* polling
* autosave
* cleanup subscription

---

# 2. Package nên dùng

## Angular Material

```bash
ng add @angular/material
```

## Angular CDK

Angular CDK thường được cài kèm Angular Material.

Dùng cho:

* drag and drop
* overlay
* scrolling
* accessibility helpers

---

# 3. Component mapping cho TaskFlow

## Authentication

### UI

* `MatFormField`
* `MatInput`
* `MatButton`
* `MatCard`

### Dùng cho

* login form
* validate input
* loading khi login fake

---

## Task Board

### UI

* `MatCard`
* `MatButton`
* `MatIcon`
* `MatMenu`
* `MatDialog`
* `CdkDragDrop`

### Dùng cho

* hiển thị task card
* tạo task
* sửa task
* xóa task
* move task giữa các status column

---

## Search Task

### UI

* `MatFormField`
* `MatInput`
* `MatIcon`
* `MatProgressSpinner`

### Dùng cho

* realtime search
* loading khi đang gọi API
* clear keyword

---

## Filter Task

### UI

* `MatSelect`
* `MatChips`
* `MatButtonToggle`

### Dùng cho

* filter theo status
* filter theo assignee
* filter theo keyword

---

## Draft Autosave

### UI

* `MatFormField`
* `MatInput`
* `MatSnackBar`
* `MatProgressSpinner`

### Dùng cho

* task detail form
* trạng thái saving
* thông báo autosave thành công hoặc lỗi

---

## Infinite Scroll

### UI

* `CdkScrollable`
* `MatProgressSpinner`
* `MatList`

### Dùng cho

* load thêm task khi scroll
* hiển thị loading ở cuối danh sách

---

## Notification System

### UI

* `MatSnackBar`
* `MatBadge`
* `MatMenu`
* `MatIcon`

### Dùng cho

* fake realtime notification
* hiển thị số lượng notification chưa đọc
* menu danh sách notification

---

# 4. Khi nào dùng Tailwind CSS

Tailwind CSS có thể dùng nếu muốn kiểm soát giao diện chi tiết hơn.

Tuy nhiên với project này, Tailwind không phải lựa chọn chính vì:

* cần tự thiết kế nhiều component hơn
* dễ tốn thời gian vào styling
* không giúp trực tiếp cho mục tiêu học RxJS

Nếu muốn UI đẹp hơn, có thể kết hợp:

```txt
Angular Material + custom SCSS
```

Thay vì thêm Tailwind ngay từ đầu.

---

# 5. Quyết định

## Chọn

```txt
Angular Material + Angular CDK
```

## Không ưu tiên ban đầu

```txt
Tailwind CSS
Bootstrap
PrimeNG
NG-ZORRO
```

## Lý do chính

Angular Material đủ tốt cho TaskFlow, tích hợp tốt với Angular, có CDK drag/drop, và giúp project tập trung vào RxJS thay vì UI infrastructure.
