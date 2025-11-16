# Giới thiệu Lodash

Lodash là thư viện hỗ trợ thao tác dữ liệu trong JavaScript. Cung cấp nhiều hàm để xử lý mảng, obj, chuỗi, so sánh dữ liệu, clone dữ liệu, .... Mục tiêu viết code ngắn gọn, dễ đọc và giảm lỗi phát sinh khi thao tác dữ liệu phức tạp.

---

# Tại sao dùng Lodash?

JavaScript hiện đại đã có nhiều hàm mạnh mẽ như `map`, `filter`, `reduce`, nhưng khi làm các nghiệp vụ phức tạp như deep clone, so sánh sâu hai object, group dữ liệu nhiều cấp, hoặc xử lý danh sách object trả về từ database => thì JS thuần dài dòng + dễ sai. => Dùng các func của lodash thay thế

---

# Lodash khác gì so với JavaScript thường?

1. Các hàm của lodash bao quát nhiều trường hợp đặc biệt, tránh lỗi khi dữ liệu null, undefined.
2. Code viết bằng lodash thường ngắn, dễ đọc, dễ hiểu hơn.
3. Lodash có các hàm xử lý chuyên sâu mà JS thuần không có sẵn, ví dụ:

   - `_.cloneDeep`
   - `_.isEqual`
   - `_.groupBy`
   - `_.uniqBy`
   - `_.sumBy`

---

# Một số thao tác thường dùng

## 1. Deep clone object

### JavaScript thuần

```js
const clone = JSON.parse(JSON.stringify(obj));
```

Cách này mất dữ liệu Date, Function, Symbol và không xử lý được vòng tham chiếu. (vd: A chứa B, B lại chứa A)

### Lodash

```js
const clone = _.cloneDeep(obj);
```

An toàn, đúng, dùng được trong hầu hết trường hợp.

---

## 2. So sánh sâu hai object

### JS thuần

Thông thường phải tự viết hàm đệ quy khá dài.

### Lodash

```js
_.isEqual(a, b);
```

Trả về đúng nếu hai object giống nhau về giá trị.

---

## 3. Group dữ liệu và tổng hợp dữ liệu

Ví dụ khi xử lý data từ database (Node.js).

```js
const grouped = _.groupBy(orders, "userId");
const summary = _.map(grouped, (items, userId) => ({
  userId: Number(userId),
  total: _.sumBy(items, "total"),
}));
```

Việc group và tính tổng được viết rõ ràng, thể hiện đúng luồng xử lý dữ liệu.

---

## 4. Lọc và chọn trường trong danh sách object

```js
const result = _.chain(products)
  .filter({ isActive: true })
  .orderBy(["createdAt"], ["desc"])
  .map((item) => _.pick(item, ["id", "name", "price"]))
  .value();
```

Cách viết dạng chuỗi (chain) dễ đọc và rõ ràng khi xử lý nhiều bước liên tiếp.

---

# Khi nào nên sử dụng Lodash?

Nên dùng khi:

- Cần deep clone, deep compare.
- Xử lý collection phức tạp (group, sort nhiều cấp, uniq, sum).
- Code ở tầng service/backend cần rõ ràng, tránh xử lý thủ công dễ sai.

Có thể dùng JS thường khi:

- Tác vụ đơn giản: map, filter, find, reduce.
- Dữ liệu nhỏ, không cần xử lý phức tạp.

---
