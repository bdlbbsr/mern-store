console.log("Service Worker Loaded");

const cacheData = "appV1";

// install the cache
this.addEventListener("install", (event) => {
  event.waitUntil(
    // open the cache
    caches.open(cacheData).then((cache) => {
      // add all the files to the cache
      cache.addAll([
        "/static/js/main.64f66742.js",
        "/static/css/main.5f1bbe50.css",
        "/",
        "/index.html",
        "/cart",
        "/about",
        "/wishlist",
        "/account",
       
        
      ]);
    })
  );
});

// refetch the cache
this.addEventListener("fetch", (event) => {
  const { request } = event;

  // Exclude requests with 'chrome-extension' scheme
  if (request.url.startsWith("chrome-extension://")) {
    return;
  }

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      // Return cached response if found
      if (cachedResponse) {
        return cachedResponse;
      }

      // If request is not cached, fetch it from the network
      return fetch(request)
        .then((networkResponse) => {
          // Cache the fetched response
          if (request.method === "GET") {
            const clonedResponse = networkResponse.clone();
            caches.open(cacheData).then((cache) => {
              cache.put(request, clonedResponse);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // If fetching from network fails and there's no cached response, respond with a custom offline message
          return new Response(
            "You are offline. Please check your internet connection.",
            {
              status: 503,
              statusText: "Offline",
            }
          );
        });
    })
  );
});