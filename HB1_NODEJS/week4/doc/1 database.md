# **Tóm tắt nội dung**

- A. Vì sao phải dùng db
- B. SQL và NoSQL khác nhau ở điểm nào
- C. db thực sự lưu dữ liệu như thế nào
- D. db lấy (fetch) dữ liệu ra sao

---

# **A. Vì sao phải dùng db**

Nếu ứng dụng chỉ chạy để test thử thì có thể lưu vào biến trong code. Nhưng khi bước vào thực tế, dữ liệu cần được lưu lại lâu dài, ổn định và phải đảm bảo o mất khi server tắt. Đây là lý do đầu tiên phải dùng db.

Ngoài ra, db còn xử lý rất nhiều thứ mà code cơm o làm nổi:

1. Lưu trữ bền vững, o mất dữ liệu.
2. Tìm kiếm và lọc dữ liệu nhanh, có index để tối ưu.
3. Cho phép nhiều người dùng ghi/đọc đồng thời mà o xung đột.
4. Bảo mật, phân quyền người dùng, hạn chế truy cập.
5. Dễ mở rộng khi lượng dữ liệu tăng lên.
6. Đảm bảo dữ liệu chính xác nhờ các ràng buộc (unique, primary key, foreign key).

---

# **B. SQL và NoSQL khác nhau ở điểm nào**

Hai nhóm db này ra đời để giải quyết hai kiểu bài toán khác nhau.

### 1. SQL (db quan hệ)

SQL lưu dữ liệu theo dạng bảng, rất chặt chẽ và có schema rõ ràng. Mọi cột đều phải có kiểu dữ liệu cụ thể.
SQL phù hợp với các ứng dụng có logic nghiệp vụ rõ ràng, nhiều mối quan hệ giữa các bảng và cần đảm bảo chính xác tuyệt đối.

Ví dụ: MySQL, PostgreSQL, SQL Server.

### 2. NoSQL (db phi quan hệ - nghe cứ kì kì, thường o ai dịch sang tiếng việt)

NoSQL linh hoạt hơn. Thường lưu dạng document giống JSON, hoặc key-value. o cần schema cố định. Dữ liệu có thể thay đổi cấu trúc tùy ý.

Phù hợp cho các hệ thống scale lớn, dữ liệu nhiều, tốc độ cao, ví dụ như logging, IoT, mạng xã hội.

Ví dụ: MongoDB (document), Redis (key-value).

### 3. So sánh nhanh

| Tiêu chí       | SQL           | NoSQL               |
| -------------- | ------------- | ------------------- |
| Cấu trúc       | Bảng (table)  | Document, key-value |
| Schema         | Cố định, chặt | Linh hoạt           |
| Quan hệ        | Mạnh (JOIN)   | Hạn chế             |
| Scale          | Dọc           | Ngang rất tốt       |
| Tính nhất quán | Cao (ACID)    | Tùy loại            |

Nhìn chung

- SQL mạnh về tính ổn định và quan hệ;
- NoSQL mạnh về tốc độ và sự linh hoạt.

---

# **C. db lưu dữ liệu như thế nào**

## 1. SQL db

SQL lưu dữ liệu theo **page**. Mỗi page có kích thước cố định. Một page chứa nhiều dòng dữ liệu.

db duy trì các file vật lý trên ổ cứng, trong đó:

- Bảng được chia nhỏ thành nhiều page
- Mỗi page chứa nhiều hàng
- Các chỉ mục (index) được lưu dưới dạng **B-Tree**

Khi truy vấn theo index, db đi thẳng vào node tương ứng trong B-Tree, sau đó truy cập page chứa dữ liệu.

Đây là lý do SQL rất nhanh khi tìm kiếm bằng index.

## 2. NoSQL db (MongoDB)

MongoDB lưu dữ liệu dưới dạng **document BSON** — gần giống JSON nhưng tối ưu hơn.

Mỗi document lưu đầy đủ thông tin của đối tượng đó, o phụ thuộc vào bảng khác. o cần JOIN.

Ví dụ một document:

```json
{
  "_id": "123",
  "name": "Chung",
  "age": 23,
  "skills": ["JS", "Node"]
}
```

Kiểu lưu trữ này giúp đọc một document cực nhanh.

---

# **D. db fetch dữ liệu ra sao**

## 1. SQL

Khi chạy query như:

```sql
SELECT * FROM users WHERE id = 10;
```

Quy trình bên trong như sau:

1. Câu SQL được phân tích (parser).
2. Optimizer tìm cách chạy hiệu quả nhất.
3. Nếu có index => db tra cứu index (B-Tree).
4. Từ index tìm ra page chứa dòng dữ liệu.
5. Đọc page => trả kết quả.

Nếu **o có index**, db phải đọc từ đầu tới cuối bảng => gọi là **full table scan**.

## 2. NoSQL (MongoDB)

MongoDB dùng filter JSON:

```js
db.users.find({ age: { $gte: 20 } });
```

Nếu có index theo field `age`, db tìm rất nhanh.
Nếu o có index => MongoDB cũng phải scan toàn bộ collection.

MongoDB thường fetch cả document => nhanh hơn nếu cấu trúc dữ liệu phù hợp.

---

# **Tóm lại**

- db là nền tảng bắt buộc của ứng dụng thực tế.
- SQL và NoSQL phục vụ những kiểu bài toán khác nhau.
- Cách lưu trữ thực tế của db rất tối ưu: dùng page, file, index.
- Fetch dữ liệu dựa vào index; nếu o có index thì cả SQL lẫn NoSQL đều phải scan toàn bộ.

---
