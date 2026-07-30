// Service Worker for 地震チェッカー PWA
const CACHE_NAME = 'eq-checker-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/icchecker.html',
  '/iphone_checker.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
];

// インストール時
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// フェッチ時
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // キャッシュにあれば返す
        if (response) {
          return response;
        }
        // なければネットワークから取得
        return fetch(event.request);
      })
  );
});

// _activation時古いキャッシュ削除
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
