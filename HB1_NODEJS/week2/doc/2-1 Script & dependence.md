### `scripts`, `dependencies` và `devDependencies` trong package.json (theo môi trường dev, staging, production)

## 1. scripts

- Là nơi định nghĩa các command để chạy trong project.
- Chỉ là command, không liên quan đến môi trường hay bao gồm package nào.
- Ví dụ:

```json
"scripts": {
  "dev": "nodemon app.js",
  "build": "tsc",
  "start": "node dist/app.js",
  "test": "jest"
}
```

- **Môi trường nào chạy script gì là do mình quyết định**, ví dụ:

> scripts không phụ thuộc vào devDependencies hay dependencies — nó chỉ gọi các lệnh có trong project.

---

## 2. dependencies

- Là các package **cần thiết khi ứng dụng chạy thực tế**.
- Bao gồm các thư viện **runtime**:

  - express
  - mongoose
  - cors
  - jsonwebtoken
  - bcrypt
  - react, next, redux (FE)

- Khi deploy lên production, hệ thống **bắt buộc phải cài dependencies** để app chạy được.

## 3. devDependencies

- Các package **chỉ dùng trong lúc phát triển**, không cần khi app chạy production:

  - nodemon (reload khi dev)
  - eslint, prettier
  - typescript, ts-node
  - vitest/jest
  - webpack/vite tools
  - husky, lint-staged

- Không cần thiết trong production vì **không ảnh hưởng đến việc chạy app**.

## 4. Ở môi trường production, vì sao devDependencies không được cài?

Khi deploy, người ta thường chạy:

```bash
npm install --production
# hoặc
npm ci --only=production
```

Lúc đó:

- **dependencies** → được cài đầy đủ
- **devDependencies** → **bị bỏ qua**

Lý do:

- Giảm kích thước image/server
- Startup nhanh hơn
- Giảm rủi ro bảo mật (dev packages nhiều CVE - danh sách công khai ghi lại tất cả lỗ hổng bảo mật đã được phát hiện trên phần mềm, thư viện, hệ điều hành, framework…)
