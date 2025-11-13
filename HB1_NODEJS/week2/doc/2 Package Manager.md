### Package Manager

- package.json là file cấu hình trung tâm của một dự án Node.js (hoặc bất kỳ project dùng npm/yarn/pnpm).

- Th cu này mô tả :
  - Tên, version của project
  - Các dependencies (các thư viện mà project cần)
  - Script để chạy task (start, build, test…)
  - Metadata (mô tả, tác giả, license…)
  - Thông tin cấu hình cho module system, environment

### Các PM

#### NPM

- npm (Node Package Manager) là **package manager mặc định** khi cài Node.js.
- Được sử dụng rộng rãi nhất.
- Tạo file khóa: `package-lock.json`.
- Lệnh phổ biến:
  - `npm install`
  - `npm run dev`
  - `npm update`
- Ưu điểm:
  - Mặc định có sẵn, dễ dùng
  - Ổn định, ít lỗi tương thích
- Nhược điểm:
  - Tốc độ cài chậm hơn yarn/pnpm
  - Dùng cơ chế copy folder → tốn dung lượng

---

#### Yarn

- Tạo bởi Facebook nhằm cải thiện điểm yếu của npm trong giai đoạn đầu.
- Tạo file khóa: `yarn.lock`.
- Có hai nhánh:
  - Yarn v1 (classic) – phổ biến, dễ dùng
  - Yarn v2/berry – nhiều thay đổi, khó onboard
- Lệnh phổ biến:
  - `yarn install`
  - `yarn dev`
  - `yarn add <pkg>`
- Ưu điểm:
  - Từng nhanh hơn npm
  - Output sạch, dễ đọc
  - Workspace tốt
- Nhược điểm:
  - Yarn berry thay đổi nhiều → dễ gây lỗi
  - Không đi kèm Node.js, phải cài thêm

---

#### PNPM

- pnpm (Performant NPM) là PM hiện đại nhất, **nhanh nhất** và **tiết kiệm dung lượng nhất**.
- Tạo file khóa: `pnpm-lock.yaml`.
- Dùng cơ chế **global store + hard linking** → không nhân bản toàn bộ node_modules cho mỗi dự án.
- Lệnh:
  - `pnpm install`
  - `pnpm dev`
  - `pnpm add <pkg>`
- Ưu điểm:
  - Nhanh nhất trong 3 PM
  - Tốn ít dung lượng nhất
  - Monorepo, workspace mạnh
- Nhược điểm:
  - Một số dự án cũ có thể chưa hỗ trợ hoàn toàn

---

#### Tóm tắt sự khác biệt

| PM   | Tốc độ     | Dung lượng | Lockfile          | Ghi chú              |
| ---- | ---------- | ---------- | ----------------- | -------------------- |
| NPM  | Trung bình | Lớn        | package-lock.json | Mặc định, ổn định    |
| Yarn | Nhanh      | Lớn        | yarn.lock         | Workspace tốt        |
| PNPM | Nhanh nhất | Nhỏ nhất   | pnpm-lock.yaml    | Tối ưu nhất hiện nay |

### Script
