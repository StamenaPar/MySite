(function () {
  'use strict';

  var Shop = window.Shop;
  if (!Shop) return;

  var KEY = 'fern-clay-cart';
  var MAX_QTY = 20;
  var FREE_SHIPPING = 7500;
  var SHIPPING = 600;
  var byId = {};
  Shop.PRODUCTS.forEach(function (p) { byId[p.id] = p; });

  // ---------- state ----------
  function load() {
    var out = {};
    try {
      var raw = JSON.parse(localStorage.getItem(KEY)) || {};
      Object.keys(raw).forEach(function (id) {
        var q = Math.floor(Number(raw[id]));
        if (byId[id] && q > 0) out[id] = Math.min(q, MAX_QTY);
      });
    } catch (e) { /* storage unavailable or corrupt: start empty */ }
    return out;
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch (e) { /* ignore */ }
  }
  var cart = load();

  function count() {
    return Object.keys(cart).reduce(function (n, id) { return n + cart[id]; }, 0);
  }
  function subtotal() {
    return Object.keys(cart).reduce(function (n, id) { return n + cart[id] * byId[id].price; }, 0);
  }
  function setQty(id, q) {
    if (!byId[id]) return;
    if (q <= 0) delete cart[id]; else cart[id] = Math.min(q, MAX_QTY);
    save();
    render();
  }

  var live = document.getElementById('live');
  function announce(msg) {
    if (!live) return;
    live.textContent = '';
    setTimeout(function () { live.textContent = msg; }, 50);
  }

  // ---------- drawer (not on the cart page) ----------
  var onCartPage = !!document.getElementById('cart-page');
  var drawer = null, backdrop = null, opener = null;

  if (!onCartPage) {
    backdrop = document.createElement('div');
    backdrop.className = 'backdrop';
    backdrop.hidden = true;
    drawer = document.createElement('div');
    drawer.className = 'drawer';
    drawer.hidden = true;
    drawer.setAttribute('role', 'dialog');
    drawer.setAttribute('aria-modal', 'true');
    drawer.setAttribute('aria-labelledby', 'drawer-title');
    drawer.innerHTML =
      '<div class="drawer-head"><h2 id="drawer-title">Your cart</h2>' +
      '<button class="icon-btn" type="button" data-cart-close aria-label="Close cart">×</button></div>' +
      '<div class="drawer-body" data-cart-lines tabindex="-1"></div>' +
      '<div class="drawer-foot"><div class="row"><span>Subtotal</span><span data-cart-subtotal></span></div>' +
      '<p class="hint" data-cart-hint></p>' +
      '<a class="btn block" href="cart.html">View cart &amp; checkout</a>' +
      '<button class="btn ghost block" type="button" data-cart-close>Continue shopping</button></div>';
    document.body.appendChild(backdrop);
    document.body.appendChild(drawer);

    backdrop.addEventListener('click', closeDrawer);
    drawer.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closeDrawer(); return; }
      if (e.key !== 'Tab') return;
      var f = drawer.querySelectorAll('a[href],button:not([disabled])');
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === drawer.querySelector('[data-cart-lines]'))) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  }

  function openDrawer(from) {
    if (!drawer) return;
    opener = from || document.activeElement;
    backdrop.hidden = false;
    drawer.hidden = false;
    document.body.style.overflow = 'hidden';
    drawer.querySelector('[data-cart-close]').focus();
  }
  function closeDrawer() {
    if (!drawer || drawer.hidden) return;
    backdrop.hidden = true;
    drawer.hidden = true;
    document.body.style.overflow = '';
    if (opener && opener.focus) opener.focus();
  }

  // ---------- rendering ----------
  function linesHTML() {
    var ids = Object.keys(cart);
    if (!ids.length) {
      return '<p class="empty">Your cart is empty.<br><a href="index.html#products"' + (onCartPage ? '' : ' data-cart-close') + '>Browse the collection</a></p>';
    }
    return '<ul class="lines">' + ids.map(function (id) {
      var p = byId[id], q = cart[id];
      return '<li class="line">' + Shop.art(p) +
        '<div><p class="line-name">' + p.name + '</p><p class="line-unit">' + Shop.format(p.price) + ' each</p>' +
        '<div class="qty" role="group" aria-label="Quantity for ' + p.name + '">' +
        '<button type="button" data-action="dec" data-id="' + id + '" aria-label="Decrease quantity of ' + p.name + '">−</button>' +
        '<span aria-label="Quantity">' + q + '</span>' +
        '<button type="button" data-action="inc" data-id="' + id + '" aria-label="Increase quantity of ' + p.name + '"' + (q >= MAX_QTY ? ' disabled' : '') + '>+</button>' +
        '</div></div>' +
        '<div class="line-side"><p class="line-total">' + Shop.format(p.price * q) + '</p>' +
        '<button type="button" class="remove" data-action="remove" data-id="' + id + '" aria-label="Remove ' + p.name + ' from cart">Remove</button></div></li>';
    }).join('') + '</ul>';
  }

  function each(sel, fn) { Array.prototype.forEach.call(document.querySelectorAll(sel), fn); }

  function render() {
    var n = count(), sub = subtotal();
    var ship = n === 0 ? 0 : (sub >= FREE_SHIPPING ? 0 : SHIPPING);

    each('[data-cart-count]', function (el) { el.textContent = n; });
    each('[data-cart-count-text]', function (el) { el.textContent = n + (n === 1 ? ' item' : ' items'); });

    each('[data-cart-lines]', function (box) {
      var a = document.activeElement;
      var had = a && box.contains(a) && a.dataset ? { action: a.dataset.action, id: a.dataset.id } : null;
      box.innerHTML = linesHTML();
      if (had) {
        var again = had.action ? box.querySelector('[data-action="' + had.action + '"][data-id="' + had.id + '"]:not([disabled])') : null;
        (again || box).focus();
      }
    });

    each('[data-cart-subtotal]', function (el) { el.textContent = Shop.format(sub); });
    each('[data-cart-shipping]', function (el) { el.textContent = n === 0 ? '—' : (ship === 0 ? 'Free' : Shop.format(ship)); });
    each('[data-cart-total]', function (el) { el.textContent = Shop.format(sub + ship); });
    each('[data-cart-hint]', function (el) {
      el.textContent = n === 0 ? '' : (sub >= FREE_SHIPPING ? 'You have free shipping.' : 'Add ' + Shop.format(FREE_SHIPPING - sub) + ' more for free shipping.');
    });
    each('[data-cart-checkout]', function (el) { el.disabled = n === 0; });
  }

  // ---------- events ----------
  document.addEventListener('click', function (e) {
    var t = e.target.closest ? e.target.closest('[data-add],[data-action],[data-cart-open],[data-cart-close],[data-cart-checkout]') : null;
    if (!t) return;

    if (t.hasAttribute('data-add')) {
      var id = t.getAttribute('data-add');
      if ((cart[id] || 0) >= MAX_QTY) { announce('Maximum quantity reached for ' + byId[id].name + '.'); return; }
      setQty(id, (cart[id] || 0) + 1);
      announce(byId[id].name + ' added to cart. ' + count() + ' items in cart.');
      each('.badge', function (b) { b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump'); });
      if (!t.dataset.label) t.dataset.label = t.innerHTML;
      t.innerHTML = 'Added ✓';
      t.classList.add('added');
      clearTimeout(t._timer);
      t._timer = setTimeout(function () { t.innerHTML = t.dataset.label; t.classList.remove('added'); }, 1400);
      return;
    }

    if (t.hasAttribute('data-action')) {
      var pid = t.getAttribute('data-id'), act = t.getAttribute('data-action');
      var q = cart[pid] || 0, name = byId[pid] ? byId[pid].name : 'Item';
      if (act === 'inc') { setQty(pid, q + 1); announce(name + ' quantity ' + (cart[pid] || 0) + '.'); }
      else if (act === 'dec') { setQty(pid, q - 1); announce(q - 1 > 0 ? name + ' quantity ' + (q - 1) + '.' : name + ' removed from cart.'); }
      else if (act === 'remove') { setQty(pid, 0); announce(name + ' removed from cart.'); }
      return;
    }

    if (t.hasAttribute('data-cart-open') && drawer) {
      e.preventDefault();
      openDrawer(t);
      return;
    }

    if (t.hasAttribute('data-cart-close')) {
      // Links (e.g. "Browse the collection") still navigate after closing.
      opener = t.tagName === 'A' ? null : opener;
      closeDrawer();
      return;
    }

    if (t.hasAttribute('data-cart-checkout')) {
      if (!count()) return;
      var total = subtotal();
      total += total >= FREE_SHIPPING ? 0 : SHIPPING;
      cart = {};
      save();
      render();
      var msg = document.getElementById('order-msg');
      if (msg) {
        msg.textContent = 'Thank you! Your demo order of ' + Shop.format(total) + ' has been placed. No payment was taken.';
        msg.hidden = false;
        msg.focus();
      }
    }
  });

  // Keep multiple tabs in sync.
  window.addEventListener('storage', function (e) {
    if (e.key === KEY || e.key === null) { cart = load(); render(); }
  });

  render();
})();
