# Tóm tắt nội dung

- A. CORS là gì? Tại sao phải dùng?
- B. Best practices khi cấu hình CORS
- C. Helmet là gì? Tại sao cần dùng?
- D. Best practices khi dùng Helmet

---

# A. CORS là gì? Tại sao phải dùng?

**1. CORS là gì?**
CORS (Cross-Origin Resource Sharing) là cơ chế cho phép th backend, nhận or ko nhận các request được gửi từ domain khác - có thể là fe, có thể là service, ... (cross-origin).

- Ví dụ :
  - FE chạy ở: `http://localhost:3000`
  - BE chạy ở: `http://localhost:4000`
    → Muốn FE gọi BE → phải bật CORS.

**2. Tại sao phải dùng?**

- **Brower mặc định chặn cross-origin** để tránh bị tấn công CSRF hoặc đánh cắp data.
- CORS giúp **kiểm soát ông nào** được phép gọi API:

  - Domain nào?
  - Method nào?
  - Header nào?
  - Có gửi cookie/token hay không?
    → Nếu không cấu hình CORS đúng → API bị chặn, FE không thể gọi.

---

# B. Best practices khi cấu hình CORS

1. **Không bao giờ để `origin: *` trong production**

- Quá nguy hiểm, mọi site đều có thể gọi đến API.

2. **Whitelist domain cụ thể**

- Ví dụ:

```ts
origin: ["https://myapp.com", "https://admin.myapp.com"];
```

3. **Giới hạn method cho phép**

- Chỉ mở những method thật sự cần:

```ts
methods: ["GET", "POST", "PUT", "DELETE"];
```

4. **Giới hạn header**

- Không mở lung tung:

```ts
allowedHeaders: ["Content-Type", "Authorization"];
```

5. **Chỉ bật credentials khi cần thiết**

- Gồm: cookie, session, token qua header.
- Nếu bật → `origin` bắt buộc là domain cụ thể, không được `*`
  - "credentials" = thông tin đăng nhập (username/password, API key, token OAuth) dùng để xác thực user với server.

```ts
credentials: true;
```

6. **Cache preflight (OPTIONS) để giảm tải**

- Cache preflight = browser lưu OPTIONS request (CORS check) để ko gửi lại, giảm tải server. Set Access-Control-Max-Age trên server.
- ví dụ :

```
1. Frontend (localhost:3000) gọi POST API (api.com/users)
   -> Browser TỰ ĐỘNG gửi OPTIONS trước để check CORS

2. Server trả:
   Access-Control-Allow-Origin: \*
   Access-Control-Max-Age: 3600 ← Cache 1h

3. Trong 1h sau: 100 lần gọi POST cùng API → Browser KHÔNG gửi OPTIONS nữa, dùng cache luôn

4. Notes : OPTIONS là HTTP method browser tự gửi TRƯỚC khi gọi API cross-origin
   (như POST/PUT/DELETE) để hỏi server: "M cho t gọi method này không?"

   Frontend: POST api.com/users  ← Muốn gửi
   Browser: OPTIONS api.com/users  ← Hỏi trước (preflight)
   Server: OK, cho phép POST      ← Trả lời
   Browser: OK, giờ gửi POST thật
```

```ts
maxAge: 600;
```

---

# C. Helmet là gì? Tại sao cần dùng?

**1. Helmet là gì?**

- là một middleware bảo mật cho ExpressJS, tự động set các HTTP Security Headers để bảo vệ ứng dụng.

**2. Tại sao cần dùng Helmet?**

- Vì mặc định Express không bật nhiều security headers quan trọng.
  Helmet giúp chống lại các nguy cơ như:

- **XSS (Cross-Site Scripting)**
  - Hacker chèn đoạn code độc vào form , vd : `<script>alert('hack')</script>`
  - Khi người khác mở trang, code đó chạy ngay trên trình duyệt của họ.
  - Cách chặn: dùng CSP (Content Security Policy) để chỉ cho phép script từ domain đáng tin cậy.
- **Clickjacking**

  - Hacker nhúng website của ae vào một iframe ẩn.
  - Người dùng tưởng đang bấm nút bình thường, nhưng thật ra click vào trang của hacker.
  - Cách chặn: thêm header X-Frame-Options: DENY để trình duyệt không cho trang bị nhúng trong iframe.

- **MIME sniffing**

  - Trình duyệt đôi khi “đoán” loại file. Hacker lợi dụng, upload file giả dạng ảnh nhưng thực chất chứa JavaScript.
  - Trình duyệt đoán sai → chạy như code.
  - Cách chặn: dùng X-Content-Type-Options: nosniff để bắt trình duyệt tin đúng MIME type mà server trả về.

- **Injection qua HTTP headers**

  - Hacker chèn header giả, ví dụ: X-Forwarded-For: 127.0.0.1 để qua mặt whitelist IP.

  - Cách để mà giảm rủi ro: lọc kỹ input header, kết hợp HSTS và CSP để hạn chế tấn công.

- **Leak thông tin server** (ẩn `X-Powered-By: Express`)

Khi bật Helmet → API an toàn hơn mà không cần tự config từng header thủ công.

---

# D. Best practices khi dùng Helmet

1. **Luôn bật Helmet trong prod**

```ts
app.use(helmet());
```

2. **Setup Content Security Policy (CSP)**

```ts
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "https://cdn.myapp.com"],
      scriptSrc: ["'self'"],
    },
  }),
);
```

3. **Tắt những module không dùng (nếu gây conflict)**
   Ví dụ cần cho phép iframe:

```ts
app.use(
  helmet({
    frameguard: false,
  }),
);
```

4. **Ẩn thông tin server**

```ts
app.disable("x-powered-by");
```

5. **Kết hợp Helmet + Rate limit + CORS** để đạt chuẩn security cơ bản của backend NodeJS prod.

---
