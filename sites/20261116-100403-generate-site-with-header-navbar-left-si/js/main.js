(function () {
  'use strict';

  // Mark that JavaScript is available so the CSS can enable the mobile drawer.
  document.documentElement.classList.add('js');

  document.addEventListener('DOMContentLoaded', function () {
    var body = document.body;
    var header = document.querySelector('.site-header');
    var toggle = document.querySelector('.menu-toggle');
    var sidebar = document.getElementById('sidebar');
    var backdrop = document.querySelector('.backdrop');
    var links = Array.prototype.slice.call(document.querySelectorAll('.nav-link'));
    var mobile = window.matchMedia('(max-width: 820px)');

    function setOpen(open, returnFocus) {
      body.classList.toggle('nav-open', open);
      if (toggle) {
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
      }
      if (backdrop) { backdrop.hidden = !open; }
      if (open && links.length) {
        links[0].focus();
      } else if (!open && returnFocus && toggle) {
        toggle.focus();
      }
    }

    function isOpen() {
      return body.classList.contains('nav-open');
    }

    if (toggle && sidebar) {
      toggle.addEventListener('click', function () {
        setOpen(!isOpen(), false);
      });

      if (backdrop) {
        backdrop.addEventListener('click', function () { setOpen(false, false); });
      }

      document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && isOpen()) { setOpen(false, true); }
      });

      links.forEach(function (link) {
        link.addEventListener('click', function () {
          if (isOpen()) { setOpen(false, false); }
        });
      });

      var onChange = function (event) {
        if (!event.matches && isOpen()) { setOpen(false, false); }
      };
      if (mobile.addEventListener) {
        mobile.addEventListener('change', onChange);
      } else if (mobile.addListener) {
        mobile.addListener(onChange);
      }
    }

    // Highlight the navigation link for the section currently in view.
    function setCurrent(id) {
      links.forEach(function (link) {
        if (link.getAttribute('href') === '#' + id) {
          link.setAttribute('aria-current', 'location');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    }

    var sections = links
      .map(function (link) {
        return document.getElementById(link.getAttribute('href').slice(1));
      })
      .filter(Boolean);

    if (sections.length) {
      var ticking = false;

      var updateCurrent = function () {
        ticking = false;
        var offset = (header ? header.offsetHeight : 0) + 32;
        var current = sections[0];
        sections.forEach(function (section) {
          if (section.getBoundingClientRect().top <= offset) { current = section; }
        });
        // At the very bottom of the page the last section wins,
        // even if it is too short to reach the top of the viewport.
        var doc = document.documentElement;
        var scrollable = doc.scrollHeight - window.innerHeight;
        if (scrollable > 0 && window.scrollY >= scrollable - 2) {
          current = sections[sections.length - 1];
        }
        setCurrent(current.id);
      };

      var requestUpdate = function () {
        if (ticking) { return; }
        ticking = true;
        window.requestAnimationFrame(updateCurrent);
      };

      window.addEventListener('scroll', requestUpdate, { passive: true });
      window.addEventListener('resize', requestUpdate);
      updateCurrent();
    }

    var year = document.getElementById('year');
    if (year) { year.textContent = String(new Date().getFullYear()); }
  });
})();
