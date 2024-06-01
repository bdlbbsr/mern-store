import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

// Precache all the assets generated by the build process
precacheAndRoute(self.__WB_MANIFEST);

// Example runtime caching route for images
registerRoute(
  ({ request }) => request.destination === 'image',
  new StaleWhileRevalidate({
    cacheName: 'image-cache',
  })
);

// You can add more routes here for different assets or API endpoints
