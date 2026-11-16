(function () {
  var root = document.documentElement;
  var toggle = document.getElementById('navToggle');
  var sidebar = document.getElementById('sidebar');
  var backdrop = document.getElementById('backdrop');
  var themeBtn = document.getElementById('themeToggle');
  var links = Array.prototype.slice.call(sidebar.querySelectorAll('a[href^="#"]'));

  /* Year */
  var year = document.getElementById('year');
  if (year) { year.textContent = String(new Date().getFullYear()); }

  /* Mobile navigation drawer */
  function setNav(open) {
    root.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    backdrop.hidden = !open;
  }
  toggle.hidden = false;
  toggle.addEventListener('click', function () {
    var open = !root.classList.contains('nav-open');
    setNav(open);
    if (open && links[0]) { links[0].focus(); }
  });
  backdrop.addEventListener('click', function () { setNav(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && root.classList.contains('nav-open')) {
      setNav(false);
      toggle.focus();
    }
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 860 && root.classList.contains('nav-open')) { setNav(false); }
  });

  /* Current section highlighting */
  function setCurrent(id) {
    links.forEach(function (a) {
      if (a.getAttribute('href') === '#' + id) {
        a.setAttribute('aria-current', 'true');
      } else {
        a.removeAttribute('aria-current');
      }
    });
  }
  links.forEach(function (a) {
    a.addEventListener('click', function () {
      setCurrent(a.getAttribute('href').slice(1));
      setNav(false);
    });
  });
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { setCurrent(entry.target.id); }
      });
    }, { rootMargin: '-25% 0px -65% 0px' });
    links.forEach(function (a) {
      var section = document.getElementById(a.getAttribute('href').slice(1));
      if (section) { observer.observe(section); }
    });
  }

  /* Theme toggle */
  function isDark() {
    var t = root.getAttribute('data-theme');
    if (t) { return t === 'dark'; }
    return !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  }
  function syncThemeBtn() {
    themeBtn.setAttribute('aria-pressed', String(isDark()));
  }
  themeBtn.hidden = false;
  syncThemeBtn();
  themeBtn.addEventListener('click', function () {
    var next = isDark() ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
    syncThemeBtn();
  });
})();
