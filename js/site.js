/* ============================================================
   Site behaviour: theme toggle + scroll reveal.
   The pre-paint theme is set by a small inline script in <head>;
   this file only handles the toggle and the reveal.
   ============================================================ */

(function () {
    'use strict';

    var root = document.documentElement;

    /* ---------------------------------------------------------
       Theme toggle
       --------------------------------------------------------- */

    function systemPrefersDark() {
        return !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }

    function currentTheme() {
        return root.getAttribute('data-theme') || (systemPrefersDark() ? 'dark' : 'light');
    }

    function describe(btn) {
        var dark = currentTheme() === 'dark';
        btn.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
        btn.setAttribute('aria-pressed', dark ? 'true' : 'false');
    }

    var toggle = document.querySelector('.theme-toggle');

    if (toggle) {
        describe(toggle);

        toggle.addEventListener('click', function () {
            var next = currentTheme() === 'dark' ? 'light' : 'dark';
            root.setAttribute('data-theme', next);
            try { localStorage.setItem('theme', next); } catch (e) { /* private mode */ }
            describe(toggle);
        });

        // Keep the button's label honest if the system flips while the
        // visitor has not made a manual choice.
        if (window.matchMedia) {
            var mq = window.matchMedia('(prefers-color-scheme: dark)');
            var onSystemChange = function () {
                var stored = null;
                try { stored = localStorage.getItem('theme'); } catch (e) { /* ignore */ }
                if (!stored) { describe(toggle); }
            };
            if (mq.addEventListener) { mq.addEventListener('change', onSystemChange); }
            else if (mq.addListener) { mq.addListener(onSystemChange); }
        }
    }

    /* ---------------------------------------------------------
       Scroll reveal

       Nothing is hidden up front by CSS alone: the .reveal class is
       only ever added here. If this script fails to run, every page
       still renders in full.
       --------------------------------------------------------- */

    var prefersReducedMotion = !!(window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches);

    if (prefersReducedMotion || !('IntersectionObserver' in window)) { return; }

    var targets = document.querySelectorAll(
        '.project-item, .exp-item, .timeline-item, .cert-item, ' +
        '.contact-row, .skill-group, .section-label'
    );

    if (!targets.length) { return; }

    var observer = new IntersectionObserver(function (entries) {
        var shown = 0;
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) { return; }
            var el = entry.target;
            var delay = shown * 80;
            shown += 1;
            window.setTimeout(function () { el.classList.add('is-visible'); }, delay);
            observer.unobserve(el);
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    // Anything already on screen at load stays untouched, so the first
    // paint is instant and only content scrolled into view animates.
    var fold = window.innerHeight * 0.9;

    Array.prototype.forEach.call(targets, function (el) {
        if (el.getBoundingClientRect().top < fold) { return; }
        el.classList.add('reveal');
        observer.observe(el);
    });
})();
