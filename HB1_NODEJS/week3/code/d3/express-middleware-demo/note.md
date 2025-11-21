Dưới đây là **Bước 10 – bản ngắn gọn, chỉ dẫn rõ ràng để làm theo**:

---

## **Bước 10: Chạy và kiểm tra dự án (bản ngắn gọn)**

### **1) Chạy server**

```bash
npm start
```

---

### **2) Kiểm tra route OK**

**GET**
`http://localhost:3000/api/books`
→ Kết quả: danh sách books.

---

### **3) Kiểm tra route có params**

**GET**
`http://localhost:3000/api/books/1`
→ Kết quả: book có id = 1.

---

### **4) Test lỗi “không tìm thấy”**

**GET**
`http://localhost:3000/api/books/999`
→ Expect JSON error:

```json
{
  "success": false,
  "errorCode": 1001,
  "message": "Book not found"
}
```

---

### **5) Test lỗi validate (thiếu field)**

**POST**
`http://localhost:3000/api/books`
Body:

```json
{
  "author": "Someone"
}
```

→ Expect:

```json
{
  "success": false,
  "errorCode": 1002,
  "message": "Title and author are required"
}
```

---

### **6) Test lỗi internal**

**GET**
`http://localhost:3000/api/books/demo/error/internal`
→ Expect:

```json
{
  "success": false,
  "errorCode": 500,
  "message": "Unexpected server error"
}
```

---

### **7) Quan sát log console**

- Log request (middleware 1)
- Log lỗi (middleware 2)

---

Nếu muốn, anh viết thêm **toàn bộ dự án dạng copy-paste chạy ngay**.
