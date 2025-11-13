### ECMAScript

- ECMAScript (ES) là ngôn ngữ kịch bản được tiêu chuẩn hóa, là nền tảng, tiêu chuẩn dành cho ngôn ngữ JavaScript.

- Ngôn ngữ kịch bản: là ngôn ngữ lập trình dùng để ra lệnh hoặc điều khiển một phần mềm khác.

- Code được đọc và thực thi trực tiếp bởi một chương trình khác (gọi là interpreter hoặc engine) tại thời điểm chạy. Chúng không cần phải được biên dịch ra file thực thi (như .exe) trước khi chạy

#### Tóm lại

- ECMAScript = bản tiêu chuẩn gốc

- JavaScript = ngôn ngữ được các trình duyệt và Node.js hiện thực (implement) theo tiêu chuẩn đó

- Phải có ECMAScript vì
  - để đảm bảo js chạy giống nhau trên mọi môi trường (chrome, firefox, safari, ...)
  - Để các tính năng mới của JS được đề xuất, thống nhất, chuẩn hóa.
  - Tránh mỗi brower, enviroment tự làm theo cách riêng.

### Module system

- là cơ chế tổ chức src code thành các “module” - mỗi module là một file hoặc block code tự đóng gói, có export và import dữ liệu/hàm/lớp từ module khác.

- vdu 1 module cơ bản

```
// file add.js
function add (a, b) {
  return a + b;
}

module.exports = add;
```

- sửu dụng add.js ở chỗ khác

```
// index.js
const add = require('./add');
const total = add(4, 5);
console.log(total);

```

### CommonJS

- Ra đời đầu tiên, dùng chủ yếu trong Node.js.
- Tải module theo cách đồng bộ (synchronous), tức là chờ module tải xong rồi mới chạy tiếp.
- Import bằng require()
- Export bằng module.exports hoặc exports
- File dạng .js (mặc định), .cjs

```
// math.cjs
module.exports = { add: (a,b) => a+b }

// app.cjs
const { add } = require('./math.cjs')

```

### ES Module

- Chuẩn chính thức của JavaScript từ ES2015 (ES6).
- Tải module bất đồng bộ (asynchronous), giúp hiệu suất tốt hơn trên trình duyệt.
- Import bằng import
- Export bằng export
- Nạp module theo kiểu tĩnh (static), hỗ trợ tree-shaking (là cái giúp loại bỏ code không dùng đến để giảm kích thước bundle.)
- File .mjs hoặc .js khi có "type": "module" trong package.json

```
// math.mjs
export const add = (a, b) => a + b

// app.mjs
import { add } from './math.mjs'

```

### Các cách import, export function/object

---

## **ES Module (ESM)**

- Named export / named import
- Export gom nhiều hàm 1 lần
- Default export / default import
- Kết hợp default + named export
- Import tất cả bằng namespace (`import * as X from ...`)

---

### 1.1. Named export / named import

#### export

```js
// math.js
export function add(a, b) {
  return a + b;
}
export function sub(a, b) {
  return a - b;
}
export function mul(a, b) {
  return a * b;
}
export function div(a, b) {
  return a / b;
}
```

#### import

```js
// index.js
import { add, sub } from "./math.js";

add(2, 3); // 5
sub(5, 1); // 4
```

---

### 1.2. Export gom nhiều hàm 1 lần

#### export

```js
// math.js
function add(a, b) {
  return a + b;
}
function sub(a, b) {
  return a - b;
}
function mul(a, b) {
  return a * b;
}
function div(a, b) {
  return a / b;
}

export { add, sub, mul, div };
```

#### import

```js
// index.js
import { mul, div } from "./math.js";

mul(3, 4); // 12
div(10, 2); // 5
```

---

### 1.3. Default export / default import

#### export

```js
// add.js
export default function add(a, b) {
  return a + b;
}
```

#### import

```js
// index.js
import add from "./add.js";

add(4, 6); // 10
```

---

### 1.4. Kết hợp default + named export

#### export

```js
// math.js
export default function add(a, b) {
  return a + b;
}

export function sub(a, b) {
  return a - b;
}
export function mul(a, b) {
  return a * b;
}
export function div(a, b) {
  return a / b;
}
```

#### import

```js
// index.js
import add, { sub, mul } from "./math.js";

add(1, 2); // 3
sub(5, 3); // 2
mul(2, 3); // 6
```

---

### 1.5. Import tất cả bằng namespace

#### import

```js
// index.js
import * as MathUtils from "./math.js";

MathUtils.add(1, 1); // 2
MathUtils.mul(2, 5); // 10
MathUtils.div(8, 2); // 4
```

---

## **CommonJS (CJS)**

- `module.exports = { ... }` (export 1 object chứa nhiều hàm)
- `exports.tên = ...` (export từng hàm riêng lẻ)
- `module.exports = function ...` (export 1 hàm duy nhất)

---

### 2.1. module.exports = { ... }

#### export

```js
// math.cjs
function add(a, b) {
  return a + b;
}
function sub(a, b) {
  return a - b;
}
function mul(a, b) {
  return a * b;
}
function div(a, b) {
  return a / b;
}

module.exports = { add, sub, mul, div };
```

#### import

```js
// index.cjs
const { add, div } = require("./math.cjs");

add(3, 7); // 10
div(9, 3); // 3
```

---

### 2.2. exports.tên = ...

#### export

```js
// math.cjs
exports.add = function (a, b) {
  return a + b;
};
exports.sub = function (a, b) {
  return a - b;
};
exports.mul = function (a, b) {
  return a * b;
};
exports.div = function (a, b) {
  return a / b;
};
```

#### import

```js
// index.cjs
const math = require("./math.cjs");

math.add(10, 5); // 15
math.mul(3, 3); // 9
```

---

### 2.3. module.exports = function ...

#### export

```js
// add.cjs
function add(a, b) {
  return a + b;
}

module.exports = add;
```

#### import

```js
// index.cjs
const add = require("./add.cjs");

add(8, 2); // 10
```

---
