# PinLog – Tech Stack & Architecture

## Tổng quan

| Layer | Công nghệ | Lý do chọn |
|---|---|---|
| Frontend | React + Vite | PWA support, ecosystem tốt |
| Maps | Google Maps JS API | Places search + Map rendering |
| Auth | Firebase Authentication | Google OAuth 1 click |
| Database | Cloud Firestore | Realtime sync, offline cache |
| Storage | Firebase Storage | Lưu ảnh upload |
| Hosting | Firebase Hosting | Free, CDN global, custom domain |
| PWA | Vite PWA Plugin | Service worker tự động |

---

## Frontend

### Stack
```
React 18 + Vite 5
React Router v6          // routing
Zustand                  // state management (nhẹ hơn Redux)
TailwindCSS              // styling utility-first
Vite PWA Plugin          // auto service worker + manifest
```

### Cấu trúc thư mục
```
src/
  components/
    map/
      MapView.jsx         // Google Maps container
      PlaceMarker.jsx     // Custom marker theo category
      SearchBox.jsx       // Google Places Autocomplete
    place/
      PlaceForm.jsx       // Form thêm/sửa địa điểm
      PlaceCard.jsx       // Card preview
      PlaceDetail.jsx     // Màn hình chi tiết
      StarRating.jsx      // Component rating sao
    collection/
      CollectionList.jsx
      CollectionCard.jsx
      InviteModal.jsx
    ui/                   // Button, Input, Modal, Tag...
  pages/
    Home.jsx              // Map + bottom sheet
    ListPage.jsx          // Danh sách + filter
    AddPlace.jsx          // Form thêm địa điểm
    CollectionPage.jsx
    ProfilePage.jsx
  hooks/
    usePlaces.js          // Firestore realtime listener
    useCollection.js
    useGeolocation.js
    useGoogleMaps.js
  stores/
    authStore.js
    placeStore.js
    filterStore.js
  firebase/
    config.js             // Firebase init
    places.js             // CRUD operations
    collections.js
    storage.js
  utils/
    categories.js         // Danh sách category + màu
    formatters.js
```

---

## Backend – Firebase

### Firebase Authentication
- Provider: **Google OAuth**
- Mỗi user có uid riêng, dùng làm addedBy trong Place

### Cloud Firestore

#### Collections (Firestore collections):
```
/users/{userId}
/places/{placeId}
/collections/{collectionId}
```

#### Security Rules:
```javascript
// Place: chỉ đọc nếu là member của collection chứa nó
// hoặc chính người tạo
match /places/{placeId} {
  allow read: if isCollectionMember(resource.data.collectionIds)
           || resource.data.addedBy == request.auth.uid;
  allow create: if request.auth != null;
  allow update, delete: if resource.data.addedBy == request.auth.uid;
}

match /collections/{collId} {
  allow read: if isMember(collId);
  allow create: if request.auth != null;
  allow update: if isOwner(collId);
}
```

#### Indexes cần tạo:
```
places: addedBy + visitedAt DESC
places: collectionIds (array-contains) + rating DESC
places: collectionIds (array-contains) + visitedAt DESC
```

### Firebase Storage
```
/photos/{userId}/{placeId}/{filename}
```
- Max 5MB mỗi ảnh
- Resize về 1200px trước khi upload (client-side với browser-image-compression)

---

## Google Maps API

### APIs cần enable:
- **Maps JavaScript API** – render bản đồ
- **Places API** – search autocomplete
- **Geocoding API** – reverse geocode khi tap map

### Tích hợp:
```javascript
// Dùng @vis.gl/react-google-maps (thư viện chính thức mới nhất)
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

// Places Autocomplete
import { usePlacesAutocomplete } from 'use-places-autocomplete';
```

### Giới hạn chi phí:
- Maps JS: $7/1000 loads → free tier 28,000 loads/tháng
- Places: $17/1000 requests → cần debounce search input
- Geocoding: $5/1000 requests

**Recommendation:** Bật billing alert tại $10 để tránh phát sinh ngoài ý muốn.

---

## PWA Configuration

```javascript
// vite.config.js
VitePWA({
  registerType: 'autoUpdate',
  manifest: {
    name: 'PinLog',
    short_name: 'PinLog',
    theme_color: '#534AB7',
    icons: [{ src: 'icon-192.png', sizes: '192x192' }]
  },
  workbox: {
    // Cache Firestore reads để xem offline
    runtimeCaching: [{
      urlPattern: /firestore\.googleapis\.com/,
      handler: 'StaleWhileRevalidate'
    }]
  }
})
```

---

## Môi trường & Deploy

### Biến môi trường (.env)
```
VITE_GOOGLE_MAPS_KEY=...
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

### Deploy workflow
```bash
npm run build         # Vite build → dist/
firebase deploy       # Deploy lên Firebase Hosting
```

### CI/CD (tuỳ chọn sau):
- GitHub Actions: push main → auto build → firebase deploy

---

## Checklist setup ban đầu

- [ ] Tạo project Google Cloud, enable Maps JS + Places + Geocoding API
- [ ] Lấy Google Maps API Key, restrict theo domain
- [ ] Tạo Firebase project
- [ ] Enable Authentication (Google provider)
- [ ] Enable Firestore (production mode)
- [ ] Enable Storage
- [ ] Enable Hosting
- [ ] Lấy Firebase config object
- [ ] Tạo Vite + React project
- [ ] Cài dependencies
- [ ] Cấu hình .env
- [ ] Deploy thử lên Firebase Hosting
