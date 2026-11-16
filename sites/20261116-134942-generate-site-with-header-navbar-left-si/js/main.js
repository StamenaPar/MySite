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

  // --- Expand / collapse navigation groups ---
  var STORAGE_KEY = 'atlasNavGroups';

  function readState() {
    try {
      var parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch (err) {
      return {};
    }
  }

  function saveState(state) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (err) { /* storage unavailable: state just is not remembered */ }
  }

  var groupState = readState();
  var groupToggles = Array.prototype.slice.call(document.querySelectorAll('.nav-group-toggle'));

  groupToggles.forEach(function (btn) {
    var id = btn.getAttribute('aria-controls');
    var list = id ? document.getElementById(id) : null;
    if (!list) { return; }

    function setExpanded(expanded) {
      btn.setAttribute('aria-expanded', String(expanded));
      list.hidden = !expanded;
    }

    // A group holding the current page always starts expanded.
    var holdsCurrent = !!list.querySelector('[aria-current="page"]');
    setExpanded(holdsCurrent || groupState[id] !== false);

    btn.addEventListener('click', function () {
      var expanded = btn.getAttribute('aria-expanded') !== 'true';
      setExpanded(expanded);
      groupState[id] = expanded;
      saveState(groupState);
    });
  });

  // --- Highlight the current section in the left navigation (same-page links only) ---
  var sectionLinks = links.filter(function (link) {
    var href = link.getAttribute('href') || '';
    return href.charAt(0) === '#' && href.length > 1;
  });

  function setCurrent(id) {
    sectionLinks.forEach(function (link) {
      if (link.getAttribute('href') === '#' + id) {
        link.setAttribute('aria-current', 'true');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  var sections = sectionLinks
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
