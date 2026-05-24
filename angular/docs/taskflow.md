# RxJS Learning Pet Project

## Project Name

```txt
TaskFlow
```

Mini Trello/Jira clone để học:

* RxJS
* Angular Reactive Forms
* State management
* Async flow
* Realtime stream
* UI reactive architecture

Backend dùng:

```txt
json-server
```

---

# 1. Mục tiêu của project

## Technical Goals

### Angular

* Standalone Component
* Reactive Forms
* Smart/Dumb Component
* Service pattern
* Route params
* HTTP interceptor

### RxJS

* Observable mindset
* Stream composition
* Reactive state
* Async orchestration
* Request cancellation
* Multicasting

### UI/UX

* Search realtime
* Infinite scroll
* Loading state
* Optimistic update
* Draft autosave

---

# 2. Functional Scope

## Authentication (fake)

### Features

* Login fake
* Persist user state

### RxJS Concepts

* `BehaviorSubject`
* `shareReplay`
* state stream

---

## Task Board

### Features

* Create task
* Update task
* Delete task
* Move status

### RxJS Concepts

* CRUD stream
* state synchronization
* optimistic update

---

## Search Task

### Features

* Search realtime
* Debounce input
* Cancel old request

### RxJS Concepts

* `debounceTime`
* `distinctUntilChanged`
* `switchMap`

---

## Filter Task

### Features

* Filter by:

  * status
  * assignee
  * keyword

### RxJS Concepts

* `combineLatest`
* derived stream

---

## Draft Autosave

### Features

* Auto save form after typing stop

### RxJS Concepts

* `valueChanges`
* `debounceTime`
* `switchMap`

---

## Infinite Scroll

### Features

* Load more when scrolling

### RxJS Concepts

* `fromEvent`
* `throttleTime`
* `mergeMap`
* `scan`

---

## Notification System

### Features

* Fake realtime notification

### RxJS Concepts

* `Subject`
* multicasting
* hot observable

---

## Polling API

### Features

* Auto refresh tasks every 10s

### RxJS Concepts

* `interval`
* `switchMap`
* cleanup

---

# 3. Kiến trúc project

```txt
src/
├── app/
│   ├── core/
│   ├── shared/
│   ├── features/
│   │   ├── auth/
│   │   ├── task-board/
│   │   ├── task-detail/
│   │   └── notification/
│   ├── services/
│   └── store/
```

---

# 4. Backend Setup

## Install

```bash
npm install -g json-server
```

---

## db.json

```json
{
  "tasks": [
    {
      "id": 1,
      "title": "Learn RxJS",
      "description": "Understand streams",
      "status": "todo",
      "assignee": "Chung"
    }
  ],
  "notifications": []
}
```

---

## Run

```bash
json-server --watch db.json --port 3000
```

---

# 5. API Design

## Tasks

```txt
GET    /tasks
GET    /tasks/:id
POST   /tasks
PATCH  /tasks/:id
DELETE /tasks/:id
```

---

## Search

```txt
GET /tasks?q=rxjs
```

---

## Filter

```txt
GET /tasks?status=todo
```

---

# 6. Những vấn đề cần giải quyết (QUAN TRỌNG)

Đây là phần giúp học RxJS thật sự.

---

## Problem 1 - Spam API khi search

### Issue

Người dùng gõ:

```txt
r
rx
rxj
rxjs
```

-> 4 requests.

### Solution

```ts
debounceTime(300)
distinctUntilChanged()
switchMap()
```

---

## Problem 2 - Race Condition

### Issue

Request cũ trả về sau request mới.

### Solution

```ts
switchMap()
```

---

## Problem 3 - Memory Leak

### Issue

Observable không unsubscribe.

### Solution

```ts
takeUntilDestroyed()
```

Hoặc:

```ts
takeUntil()
```

---

## Problem 4 - Shared State

### Issue

Nhiều component cần cùng data.

### Solution

```ts
BehaviorSubject
shareReplay
```

---

## Problem 5 - Duplicate API Calls

### Issue

Nhiều subscribe gây gọi API nhiều lần.

### Solution

```ts
shareReplay(1)
```

---

## Problem 6 - Form Autosave Spam

### Issue

Save liên tục khi typing.

### Solution

```ts
debounceTime()
filter()
```

---

## Problem 7 - Infinite Scroll Flood

### Issue

Scroll event spam.

### Solution

```ts
throttleTime()
```

---

## Problem 8 - Polling Cleanup

### Issue

Interval vẫn chạy sau destroy component.

### Solution

```ts
takeUntilDestroyed()
```

---

# 7. Roadmap triển khai

## Phase 1

### Basic CRUD

* task list
* create task
* delete task

### Học

* Observable
* subscribe
* HttpClient

---

## Phase 2

### Search + Filter

### Học

* switchMap
* debounceTime
* combineLatest

---

## Phase 3

### Shared State

### Học

* Subject
* BehaviorSubject
* shareReplay

---

## Phase 4

### Infinite Scroll + Polling

### Học

* interval
* mergeMap
* throttleTime

---

## Phase 5

### Realtime Notification

### Học

* hot observable
* multicasting

---

# 8. Operator roadmap

## Beginner

* `map`
* `filter`
* `tap`
* `take`

---

## Intermediate

* `switchMap`
* `mergeMap`
* `concatMap`
* `catchError`

---

## Advanced

* `combineLatest`
* `forkJoin`
* `shareReplay`
* `retry`
* `scan`

---

# 9. Deliverables cuối cùng

Sau project này bạn sẽ hiểu:

## Angular

* Reactive architecture
* Service state
* Smart async UI

## RxJS

* Stream mindset
* Async orchestration
* State stream
* Hot vs Cold observable
* Cancellation flow

## System Design mindset

* event-driven UI
* reactive state
* async data flow

---

# 10. Mục tiêu thật sự của project

Không phải build Trello clone.

Mà là:

```txt
Học cách nghĩ theo stream.
```

Đây là bước cực quan trọng trước khi học:

* NgRx
* Signal Store
* WebSocket realtime
* Event-driven frontend
* Reactive system design
