(function () {
  'use strict';

  var toggle = document.getElementById('navToggle');
  var sidebar = document.getElementById('sidebar');
  var backdrop = document.getElementById('backdrop');
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav-link'));

  // --- Mobile navigation drawer ---
  function setOpen(open) {
    sidebar.classList.toggle('is-open', open);
    backdrop.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  }

  if (toggle && sidebar && backdrop) {
    toggle.addEventListener('click', function () {
      var open = !sidebar.classList.contains('is-open');
      setOpen(open);
      if (open && links[0]) { links[0].focus(); }
    });

    backdrop.addEventListener('click', function () { setOpen(false); });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && sidebar.classList.contains('is-open')) {
        setOpen(false);
        toggle.focus();
      }
    });

    links.forEach(function (link) {
      link.addEventListener('click', function () { setOpen(false); });
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 820) { setOpen(false); }
    });
  }

  // --- Highlight the current section in the left navigation ---
  function setCurrent(id) {
    links.forEach(function (link) {
      if (link.getAttribute('href') === '#' + id) {
        link.setAttribute('aria-current', 'true');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  var sections = links
    .map(function (link) { return document.getElementById(link.getAttribute('href').slice(1)); })
    .filter(Boolean);

  if (sections.length) {
    setCurrent(sections[0].id);
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { setCurrent(entry.target.id); }
        });
      }, { rootMargin: '-25% 0px -65% 0px' });
      sections.forEach(function (s) { observer.observe(s); });
    }
  }

  // --- Footer year ---
  var year = document.getElementById('year');
  if (year) { year.textContent = String(new Date().getFullYear()); }

  // --- Demo contact form (nothing is sent) ---
  var form = document.getElementById('contactForm');
  var status = document.getElementById('formStatus');
  if (form && status) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var fields = Array.prototype.slice.call(form.querySelectorAll('input, textarea'));
      var firstInvalid = null;
      fields.forEach(function (field) {
        var ok = field.value.trim() !== '' && field.checkValidity();
        if (ok) {
          field.removeAttribute('aria-invalid');
        } else {
          field.setAttribute('aria-invalid', 'true');
          if (!firstInvalid) { firstInvalid = field; }
        }
      });
      if (firstInvalid) {
        status.textContent = 'Please fill in every field with valid details.';
        firstInvalid.focus();
      } else {
        status.textContent = 'Looks good. This demo form does not send anything yet.';
        form.reset();
      }
    });
  }
})();
