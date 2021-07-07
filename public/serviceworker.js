const CACHE_NAME = "version-1";
//
const urlsToCache = ["index.html", "offline.html"];

// Set self to service worker
const self = this;

// Install SW
self.addEventListener("install", (e) => {
	e.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			console.log("Opened cache");

			return cache.addAll(urlsToCache);
		})
	);
});
// Listen for requests
self.addEventListener("fetch", (e) => {
	e.respondWith(
		// Get data from cache if match is found
		caches.match(e.request).then(() => {
			// If res is not found, then internet is not present, therefore, get from offline.html
			return fetch(e.request).catch(() => caches.match("offline.html"));
		})
	);
});
// Activate the SW
self.addEventListener("activate", (e) => {
	const cacheWhitelist = [];
	// Always keep whitelist
	cacheWhitelist.push(CACHE_NAME);

	e.waitUntil(
		caches.keys().then((cacheNames) =>
			Promise.all(
				cacheNames.map((cacheName) => {
					// Cache name not included in whiteList, delete that name
					if (!cacheWhitelist.includes(cacheName)) {
						return caches.delete(cacheName);
					}
				})
			)
		)
	);
});
