/* ============================================================
   Google Analytics 4
   ------------------------------------------------------------
   The measurement ID lives here and nowhere else. To change it,
   edit the one line below — no page markup needs touching.
   ============================================================ */

(function () {
    'use strict';

    var GA_MEASUREMENT_ID = 'G-6JV8WZXW09';

    // Don't record local development traffic, so your own testing
    // doesn't pollute the numbers for the real site.
    var host = location.hostname;
    var isLocal =
        host === 'localhost' ||
        host === '127.0.0.1' ||
        host === '::1' ||
        host === '' ||               // file:// pages
        host.endsWith('.localhost') ||
        host.endsWith('.test');

    if (isLocal) {
        return;
    }

    // Bail out while the ID is still the placeholder, rather than
    // firing requests that go nowhere.
    if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID.indexOf('XXXX') !== -1) {
        return;
    }

    var tag = document.createElement('script');
    tag.async = true;
    tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
    document.head.appendChild(tag);

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID);
})();
