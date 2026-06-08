# PinLog – Ứng dụng lưu trữ & đánh giá địa điểm cá nhân

## Bài toán

Hiện nay khi đi đến một địa điểm mới, người dùng không có nơi tập trung để ghi lại trải nghiệm cá nhân – rating riêng, ghi chú riêng, ảnh riêng – đồng thời vẫn muốn chia sẻ và cộng tác với bạn bè.

Google Maps có lưu địa điểm nhưng không cho phép ghi chú sâu, chấm điểm cá nhân, hay gom nhóm linh hoạt. Các app ghi chú không có bản đồ. Không có công cụ nào kết hợp được cả hai.

**PinLog** giải quyết bài toán này: mỗi địa điểm là một "review cá nhân" đầy đủ, được lưu vào một kho chung, có thể gom nhóm linh hoạt qua Collection và filter bằng Tag – đồng thời đồng bộ realtime với bạn bè.

---

## Người dùng mục tiêu

- Người hay đi ăn, đi cafe, du lịch và muốn lưu lại trải nghiệm cá nhân
- Nhóm bạn bè đi cùng nhau, muốn cùng ghi chép và xem lại
- Người muốn xây dựng "bản đồ cá nhân" theo thời gian

---

## Mô hình dữ liệu – Place-first

Thiết kế theo mô hình **Place-first** (khác với Trip-first):

- **Place** là đơn vị trung tâm, tồn tại độc lập
- **Collection** là nhãn gom nhóm linh hoạt – một Place có thể thuộc nhiều Collection
- **Tag** là metadata trên mỗi Place, dùng để filter xuyên suốt toàn bộ kho

### So sánh với Trip-first

| | Trip-first | Place-first (PinLog) |
|---|---|---|
| Địa điểm | Phụ thuộc Trip | Độc lập |
| Gom nhóm | 1 địa điểm = 1 trip | 1 địa điểm = nhiều collection |
| Filter tag | Trong từng trip | Xuyên suốt toàn bộ kho |
| Trùng lặp | Dễ bị duplicate | Không bao giờ duplicate |

---

## Tính năng cốt lõi

### 1. Thêm địa điểm (Add Place)
- Tìm kiếm qua Google Places Autocomplete hoặc tap trên Google Map
- Thông tin lưu trữ:
  - Tên, địa chỉ, toạ độ (lat/lng)
  - Rating: sao 1–5
  - Ngày & giờ đến
  - Danh mục (Cafe, Ăn uống, Văn hoá, Thiên nhiên, Lưu trú...)
  - Ghi chú cá nhân (free text)
  - Ảnh: chọn từ thư viện, dán URL, hoặc bỏ qua
  - Collection: gom vào 1 hoặc nhiều collection

### 2. Bản đồ (Map View)
- Google Maps hiển thị toàn bộ Place dưới dạng marker
- Marker màu theo danh mục
- Tap marker → xem preview Place
- Filter trực tiếp trên map theo tag, rating, collection

### 3. Danh sách & Filter (List View)
- Xem dạng danh sách có sort: mới nhất, rating cao, gần nhất
- Filter: theo tag, danh mục, rating, collection, người thêm
- Tìm kiếm full-text theo tên và ghi chú

### 4. Collection
- Tạo collection tuỳ ý (ví dụ: "Hà Nội food", "Cafe chill", "Muốn quay lại")
- Một Place thuộc nhiều Collection cùng lúc
- Chia sẻ Collection với bạn bè → bạn có thể xem và thêm Place

### 5. Cộng tác (Collaboration)
- Mời bạn bè vào Collection qua link
- Phân quyền: Owner (full quyền) / Member (xem + thêm Place)
- Realtime sync: bạn thêm Place → tất cả thấy ngay

### 6. PWA – Mobile-first
- Cài được trên điện thoại như app native
- GPS tự detect vị trí hiện tại
- Offline cache: xem được kho địa điểm khi không có mạng

---

## Data Schema (Firestore)

```
User
  id, displayName, email, photoURL, createdAt

Place
  id
  name, address
  lat, lng
  rating          // 1–5
  visitedAt       // timestamp
  categories      // string[]  ["cafe", "food"]
  note            // string
  photos          // string[]  (urls)
  collectionIds   // string[]  (refs)
  addedBy         // userId
  createdAt

Collection
  id
  name, description, coverPhoto
  ownerId
  members         // { userId, role: "owner"|"member" }[]
  placeIds        // string[]
  createdAt

Tag
  (không lưu riêng – là giá trị trong categories[] của Place)
```

---

## Luồng nghiệp vụ chính

```
Mở app
  → Đăng nhập Google (Firebase Auth)
  → Home: bản đồ + danh sách Place của tôi

Thêm địa điểm
  → Search Google Places hoặc tap map
  → Điền rating, ngày giờ, danh mục, ghi chú, ảnh
  → Chọn Collection(s)
  → Lưu → sync Firestore → hiện trên map ngay

Xem & filter
  → Map View: marker màu theo danh mục, filter on-map
  → List View: sort + filter kết hợp
  → Collection View: xem theo bộ

Cộng tác
  → Tạo Collection → Share link
  → Bạn join → thêm Place → realtime sync cho tất cả
```

---

## Ngoài phạm vi (v1)

- Export dữ liệu (v2)
- Import từ Google Maps saved places (v2)
- Công khai profile (v2)
- Notification push (v2)
