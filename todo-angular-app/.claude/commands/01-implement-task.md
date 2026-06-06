# Implement Task (Angular FE)

Phân tích, lên kế hoạch, thực hiện task FE Angular và ghi chú vào daily log — toàn bộ flow trong một lệnh.

## Language Rules (MANDATORY)

- Plan headings, form labels: **English**
- Task description, business context, form content: **Tiếng Việt**
- Code, file path, error message: **English**

## Usage

```
/implement-task "thêm nút export vào màn danh sách"
/implement-task PROJ-123
/implement-task PROJ-123 --plan-only
```

Tham số:

- `"mô tả task"` — mô tả trực tiếp, không cần Issue ID
- `PROJ-NNN` — Issue ID từ backlog: fetch để lấy context đầy đủ
- `--plan-only` — chỉ lên kế hoạch, không sửa code

## Output Files

```
docs/daily/
└── {DDMMYY}.md    ← log daily, nhiều task cộng dồn vào cùng file theo ngày
```

Ví dụ: ngày 27/05/2026 → `docs/daily/270526.md`

---

## Instructions

### Step 1 — Xác định input

**Nếu tham số là chuỗi mô tả (`"..."`):**

- Dùng mô tả đó làm task name
- Tiếp tục Step 2

**Nếu tham số là Issue ID (`PROJ-NNN` hoặc bất kỳ format `XXX-NNN`):**

- Gọi tool tương ứng để fetch issue (ví dụ `mcp__backlog__get_issue`)
- Trích xuất: Title, Description, Priority, Assignee
- Nếu issue không tồn tại hoặc không có quyền truy cập → **dừng lại**, thông báo lỗi
- Dùng Title làm task name, Description làm context
- Tiếp tục Step 2

---

### Step 2 — Phân tích phạm vi

Đọc `CLAUDE.md` (nếu có) để nắm architecture, conventions, và styling rules của dự án.

Dựa vào task name và context, xác định **layer liên quan** trong cấu trúc Angular điển hình:

```
src/app/
├── core/               ← singleton services, interceptors, guards, app-wide providers
├── shared/             ← reusable components, pipes, directives, shared types
│   ├── components/
│   ├── pipes/
│   ├── directives/
│   └── models/
├── features/           ← feature modules / standalone feature components
│   └── {feature}/
│       ├── components/
│       ├── services/
│       ├── models/
│       ├── store/      ← NgRx / signal-based state (nếu có)
│       └── {feature}.routes.ts
└── app.routes.ts
```

> Cấu trúc thực tế có thể khác nhau theo dự án. Đọc `CLAUDE.md` hoặc `README.md` để xác nhận.

**Files cần đọc trước khi lên plan:**

1. Route / page component liên quan đến task
2. Service layer liên quan (HTTP, state)
3. Models / interfaces liên quan
4. Shared components có thể tái sử dụng

**Kiểm tra trước khi tạo mới:**

- Đọc `COMPONENT_REGISTRY.md` (nếu tồn tại) — kiểm tra component có sẵn trước khi tạo mới
- Tìm kiếm bằng `grep` / Glob để tránh duplicate service, model, pipe

**Nếu task liên quan API data binding hoặc field không hiển thị đúng:**

- Đối chiếu response thực tế từ backend với models và service
- Không giả định backend đang trả đúng theo tên field FE đang dùng
- Kiểm tra kỹ mismatch field name (ví dụ: snake_case API vs camelCase model)
- Ưu tiên normalize ở layer service/mapper thay vì fix rải rác trong template

**Nếu task liên quan Signals (Angular 17+):**

- Ưu tiên `signal()`, `computed()`, `linkedSignal()` cho local state thay vì BehaviorSubject
- Dùng `resource()` cho async data fetching vào signal state (thay RxJS khi có thể)
- `effect()` chỉ dùng cho side effects (DOM manipulation, logging) — **không** dùng để sync state
- Component mới dùng `OnPush` change detection kết hợp signals

**Nếu task liên quan Forms:**

- Angular 21+: ưu tiên **Signal Forms** cho form mới
- Dự án cũ hoặc form phức tạp: dùng **Reactive Forms** (`FormGroup`, `FormControl`)
- Form đơn giản: có thể dùng **Template-driven**
- Tham khảo skill `angular-developer` để chọn đúng approach

**Nếu task liên quan Routing:**

- Ưu tiên **lazy loading** cho feature routes
- Dùng `CanActivateFn` / `CanMatchFn` (functional guards) thay class-based guards
- Data pre-fetching: dùng `ResolveFn`

**Nếu task liên quan override style shared component:**

- Tailwind v4: winner quyết định theo thứ tự xuất hiện trong CSS file, **không phải** className string
- Dùng `!` prefix (important modifier) khi cần override: `!bg-white`, `!opacity-100`
- Custom CSS class trong `@layer utilities` không tự generate `!` variant — dùng **arbitrary property**: `![height:2.5rem]`

Đọc các file liên quan để nắm current state trước khi lên plan.

---

### Step 3 — Lên kế hoạch

Hiển thị trong chat:

```
## Implementation Plan

**Task:** {tên task}
**Layer(s):** {các layer liên quan}

### Changes
- [ ] `{file_1}` — {thay đổi gì, tại sao}
- [ ] `{file_2}` — {thay đổi gì, tại sao}

### New Files (nếu có)
- `{new_file}` — {mục đích}

### CLI Commands (nếu cần scaffold)
- `ng generate component ...`
- `ng generate service ...`

### Notes
- {lưu ý kỹ thuật quan trọng nếu có}
```

Hỏi: **"ok" để tiến hành, "skip" để dừng lại**.

**Nếu có `--plan-only`** → dừng tại đây, không sửa code.

---

### Step 4 — Thực hiện

> Chờ xác nhận từ developer trước khi sửa code.

Nguyên tắc:

- Chỉ thay đổi những gì kế hoạch đã liệt kê — **không refactor** code không liên quan
- Không thêm abstraction, helper, hoặc feature ngoài yêu cầu
- Dùng **Angular CLI** để scaffold file mới khi có thể (`ng generate component|service|pipe|...`)
- Import đường dẫn: dùng **path alias** đã cấu hình trong `tsconfig.json` (ví dụ `@app/`, `@shared/`, `@core/`) — không dùng relative path dài
- Standalone components: import trực tiếp dependency vào `imports[]` thay vì NgModule
- Services: dùng `inject()` function thay `constructor` injection trong Angular 16+
- Reuse component từ registry thay vì tạo mới nếu đã có
- Nếu tạo component/service mới → cập nhật `COMPONENT_REGISTRY.md` nếu file tồn tại
- Nếu sửa nhiều file → sửa lần lượt, verify sau mỗi bước

---

### Step 5 — Kiểm tra chất lượng

Sau khi implement xong, chạy theo thứ tự:

```bash
ng build
```

Nếu build fail → đọc lỗi TypeScript/template, sửa trước khi tiếp tục.

```bash
ng lint
```

Nếu lint fail → đọc lỗi, sửa trước khi ghi log. Không dùng `// eslint-disable` hay `@ts-ignore` trừ khi thực sự cần và phải có comment giải thích.

**Format check (nếu dự án có Prettier):**

- Không chạy full format check toàn repo — chỉ check file đã sửa:

```bash
npx prettier --check path/to/changed-file.ts
npx prettier --write path/to/changed-file.ts
```

- Nếu repo có formatting debt sẵn, ghi rõ trong log: `full format check fail do formatting debt sẵn có trên nhiều file ngoài phạm vi task`.

---

### Step 6 — Ghi daily log

**Xác định file log:**

- Lấy ngày hiện tại → format `DDMMYY` (ví dụ: 27/05/2026 → `270526`)
- File path: `docs/daily/270526.md`

**Nếu file đã tồn tại:**

- Đọc file, đếm số `## Task` hiện có → task mới là N+1
- Cập nhật **Task List** ở header (dòng đầu file): thêm dòng `- [Task {N}: {tên task ngắn}](#task-{n})` vào cuối danh sách Task List
- **Append task detail xuống cuối file** — không bao giờ chèn task mới lên trên task cũ; thứ tự trong file phải khớp với thứ tự thực hiện trong ngày

**Nếu file chưa tồn tại:**

- Tạo mới với header block ở đầu file, task mới là Task 1

**Cấu trúc file (header + task detail):**

```markdown
# Daily Log — {DD/MM/YYYY}

**Author:** ChungDT

**Task List:**

- [Task 1: {tên task 1 ngắn gọn}](#task-1)
- [Task 2: {tên task 2 ngắn gọn}](#task-2)

---

## Task 1

- Date: {DD/MM/YYYY}
- Task name (short): {tên task ngắn gọn bằng tiếng Việt}
- Short description: {mô tả 1-2 câu — làm gì, mục đích gì}
- What changed: {liệt kê những thay đổi đã thực hiện}
- Main files: {danh sách file đã sửa/tạo}
- Problems: {vấn đề hoặc khó khăn gặp phải trong quá trình làm, nếu không có ghi "Không có"}
- Solution: {cách giải quyết vấn đề trên, nếu không có vấn đề ghi "N/A"}
- Notes: {ghi chú thêm, cảnh báo, việc cần làm tiếp, hoặc "Không có"}
```

> Tất cả nội dung các field trên viết bằng **Tiếng Việt**.

**Lưu ý anchor link:** Heading `## Task 1` tự tạo anchor `#task-1`, `## Task 2` → `#task-2`, v.v. — dùng đúng pattern này trong Task List để click nhảy thẳng xuống detail task.

---

### Step 7 — Tóm tắt

Sau khi ghi log, hiển thị trong chat:

```
✅ Done: {tên task}

Changed files:
  - {file_1}
  - {file_2}

Quality gate:
  - build: PASS / FAIL
  - lint:  PASS / FAIL

Log: docs/daily/{DDMMYY}.md — Task {N}

→ Tiếp theo:
  1. Test thủ công trên UI / ng serve
  2. git commit + push
  3. Tạo PR nếu cần
```
