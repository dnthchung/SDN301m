### Try catch finally - throw

#### Khái niệm

- Error/Exception: lỗi xảy ra khi chương trình chạy (runtime), ví dụ:

  - Truy cập biến không tồn tại
  - Gọi func sai tham số
  - Lỗi kết nối DB, API

#### Cú pháp

##### a) try - catch - finish || throw

```js
function divide(a, b) {
  if (b === 0) {
    throw new Error('Không thể chia cho 0')
  }
  return a / b
}

try {
    // block code có thể phát sinh lỗi
    const result = divide(10, 0)
    console.log(result)
} catch (error) {
    /*** block xử lý lỗi
    - thằng error thường là instance của Error
    - có thể log lỗi / trả về response / ném "throw" nếu cần
    ***/
    console.error('Lỗi chia số:', error.message)
} finish {
    console.log('Khối finally luôn chạy dù có lỗi hay không')
}
```

- `finally` luôn chạy

  - dù có hay ko có lỗi
  - cu em này hữu ích cho việc giải phóng tài nguyên, đóng kết nối db,..

- `throw`
  - Chủ động ném lỗi
  - Dùng throw khi muốn dừng flow hiện tại và "bắn" lỗi lên cho nơi gọi xử lý.

##### b) Chú ý với Unhandled Rejection

- xảy ra khi một Promise bị reject, nhưng không có nơi nào bắt lỗi nó (không được .catch() hoặc không đặt trong try/catch với await).
- hiểu đơn giản : Promise bị lỗi → nhưng không ai xử lý → Node.js báo “Unhandled Promise Rejection” hoặc crash process nếu kh xử lý lỗi.

```js
// vdu 1 : Promise reject nhưng không có .catch()
new Promise((resolve, reject) => {
  reject("Lỗi r");
});

//vdu 2 : Dùng async/await nhưng không try/catch
async function getData() {
  const res = await fetch("https://abcxyz.fake"); // lỗi
  return res.json();
}

getData();
```
