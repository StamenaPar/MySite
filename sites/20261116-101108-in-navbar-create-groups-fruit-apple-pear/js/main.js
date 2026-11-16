(function () {
  'use strict';
  document.documentElement.classList.add('js');

  function load(key) {
    try { return window.localStorage.getItem(key); } catch (e) { return null; }
  }
  function save(key, value) {
    try { window.localStorage.setItem(key, value); } catch (e) { /* storage unavailable */ }
  }

  // Mark the current page in the navigation
  var page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('#site-nav a').forEach(function (a) {
    if (a.getAttribute('href') === page) {
      a.setAttribute('aria-current', 'page');
    }
  });

  // Expand / collapse groups
  document.querySelectorAll('.group-toggle').forEach(function (btn) {
    var id = btn.getAttribute('aria-controls');
    var list = document.getElementById(id);
    if (!list) { return; }
    var key = 'nav-group:' + id;

    function setOpen(open) {
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      list.hidden = !open;
    }

    var hasCurrent = !!list.querySelector('[aria-current="page"]');
    setOpen(hasCurrent || load(key) !== 'closed');

    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') !== 'true';
      setOpen(open);
      save(key, open ? 'open' : 'closed');
    });
  });

  // Mobile menu
  var menuBtn = document.querySelector('.menu-toggle');
  var nav = document.getElementById('site-nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
})();
