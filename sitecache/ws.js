importScripts('node_modules/sw-toolbox/sw-toolbox.js');
toolbox.router.get('/(.*)', toolbox.cacheFirst);
(global => {
    'use strict';

    // Load the sw-tookbox library.
    importScripts('node_modules/sw-toolbox/sw-toolbox.js');

    // Turn on debug logging, visible in the Developer Tools' console.
    global.toolbox.options.debug = true;

    // The route for the images
    toolbox.router.get('/(.*)', global.toolbox.cacheFirst, {
        cache: {
            name: 'local',
            maxEntries: 10,
            maxAgeSeconds: 86400 // cache for a day
        }
    });
    // The route for the imagescordonCare-api/v1/families/failure/
    toolbox.router.get('/cordonCare-api/v1/families/failure/(.*)', global.toolbox.cacheFirst, {
        origin: "https://tomcat-projetdigital.rhcloud.com"
    });
    toolbox.router.get('/cordonCare-api/v1/brand/(.*)', global.toolbox.cacheFirst, {
        origin: "https://tomcat-projetdigital.rhcloud.com"
    });

    // The route for any requests from the googleapis origin
    toolbox.router.get('/(.*)', global.toolbox.cacheFirst, {
        cache: {
            name: 'googleapis',
            maxEntries: 10,
            maxAgeSeconds: 86400 // cache for a day
        },
        origin: /\.googleapis\.com$/,
        // Set a timeout threshold of 2 seconds
        networkTimeoutSeconds: 2
    });

    // By default, all requests that don't match our custom handler will use the toolbox.networkFirst
    // cache strategy, and their responses will be stored in the default cache.
    global.toolbox.router.default = global.toolbox.networkFirst;

    // Boilerplate to ensure our service worker takes control of the page as soon as possible.
    global.addEventListener('install', event => event.waitUntil(global.skipWaiting()));
    global.addEventListener('activate', event => event.waitUntil(global.clients.claim()));
})(self);
