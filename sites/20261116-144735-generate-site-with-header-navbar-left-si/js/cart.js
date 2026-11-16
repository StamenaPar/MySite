(function () {
  /* Product catalogue (prices in cents; sample prices only) */
  var CATALOG = {
    apple: { name: 'Apple', cents: 349, unit: 'kg', href: 'apple.html' },
    pear: { name: 'Pear', cents: 399, unit: 'kg', href: 'pear.html' },
    banana: { name: 'Banana', cents: 189, unit: 'kg', href: 'banana.html' },
    carrots: { name: 'Carrots', cents: 149, unit: 'kg', href: 'carrots.html' },
    onions: { name: 'Onions', cents: 129, unit: 'kg', href: 'onions.html' },
    garlic: { name: 'Garlic', cents: 79, unit: 'bulb', href: 'garlic.html' },
    cabbage: { name: 'Cabbage', cents: 219, unit: 'head', href: 'cabbage.html' },
    potatoes: { name: 'Potatoes', cents: 109, unit: 'kg', href: 'potatoes.html' }
  };
  var ORDER = Object.keys(CATALOG);
  var KEY = 'cart';
  var MAX = 99;
  var memory = {};
  var store = null;
  try {
    var probe = '__cart_probe__';
    localStorage.setItem(probe, '1');
    localStorage.removeItem(probe);
    store = localStorage;
  } catch (e) {}

  /* Helpers */
  function clampQty(value) {
    var n = Math.floor(Number(value));
    if (!isFinite(n) || n < 1) { n = 1; }
    return Math.min(n, MAX);
  }
  function clean(raw) {
    var out = {};
    if (raw && typeof raw === 'object') {
      ORDER.forEach(function (id) {
        var n = Math.floor(Number(raw[id]));
        if (isFinite(n) && n >= 1) { out[id] = Math.min(n, MAX); }
      });
    }
    return out;
  }
  function read() {
    if (!store) { return clean(memory); }
    try {
      return clean(JSON.parse(store.getItem(KEY) || '{}'));
    } catch (e) {
      return {};
    }
  }
  function write(cart) {
    memory = cart;
    if (store) {
      try { store.setItem(KEY, JSON.stringify(cart)); } catch (e) {}
    }
    updateBadge(cart);
  }
  function count(cart) {
    return ORDER.reduce(function (sum, id) { return sum + (cart[id] || 0); }, 0);
  }
  function totalCents(cart) {
    return ORDER.reduce(function (sum, id) { return sum + (cart[id] || 0) * CATALOG[id].cents; }, 0);
  }
  function money(cents) {
    return '$' + (cents / 100).toFixed(2);
  }
  function plural(n) {
    return n + (n === 1 ? ' item' : ' items');
  }
  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) { node.className = cls; }
    if (text != null) { node.textContent = text; }
    return node;
  }

  /* Header badge */
  var link = document.getElementById('cartLink');
  var badge = document.getElementById('cartCount');
  function updateBadge(cart) {
    var n = count(cart);
    if (badge) {
      badge.textContent = String(n);
      badge.hidden = n === 0;
    }
    if (link) {
      link.setAttribute('aria-label', n ? 'Shopping cart, ' + plural(n) : 'Shopping cart, empty');
    }
  }
  updateBadge(read());

  /* Product page: add to cart */
  var form = document.querySelector('.buy[data-product]');
  if (form && CATALOG[form.getAttribute('data-product')]) {
    var productId = form.getAttribute('data-product');
    var product = CATALOG[productId];
    var qtyInput = form.querySelector('.qty-input');
    var buyStatus = form.parentNode.querySelector('.buy-status');
    form.hidden = false;

    form.addEventListener('click', function (e) {
      var btn = e.target.closest ? e.target.closest('[data-step]') : null;
      if (!btn || !form.contains(btn)) { return; }
      var step = Number(btn.getAttribute('data-step'));
      qtyInput.value = String(clampQty(clampQty(qtyInput.value) + step));
    });
    qtyInput.addEventListener('change', function () {
      qtyInput.value = String(clampQty(qtyInput.value));
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var qty = clampQty(qtyInput.value);
      var cart = read();
      var before = cart[productId] || 0;
      var after = Math.min(MAX, before + qty);
      var added = after - before;
      cart[productId] = after;
      write(cart);
      qtyInput.value = '1';
      if (buyStatus) {
        if (added === 0) {
          buyStatus.textContent = 'You already have the maximum of ' + MAX + ' \u00d7 ' + product.name + ' in your cart.';
        } else {
          buyStatus.textContent = 'Added ' + added + ' \u00d7 ' + product.name + '. Your cart now has ' + plural(count(cart)) + '.';
        }
      }
    });
  }

  /* Cart page */
  var list = document.getElementById('cartList');
  var rebuild = null;
  if (list) {
    var emptyBox = document.getElementById('cartEmpty');
    var filledBox = document.getElementById('cartFilled');
    var doneBox = document.getElementById('cartDone');
    var doneTitle = document.getElementById('cartDoneTitle');
    var doneText = document.getElementById('cartDoneText');
    var summary = document.getElementById('cartSummary');
    var subtotalEl = document.getElementById('cartSubtotal');
    var totalEl = document.getElementById('cartTotal');
    var clearBtn = document.getElementById('cartClear');
    var checkoutBtn = document.getElementById('cartCheckout');
    var statusEl = document.getElementById('cartStatus');
    var title = document.getElementById('cart-title');
    var ordered = false;

    var say = function (text) {
      if (statusEl) { statusEl.textContent = text; }
    };
    var rowFor = function (id) {
      return list.querySelector('[data-id="' + id + '"]');
    };

    var buildRow = function (id, qty) {
      var p = CATALOG[id];
      var li = el('li', 'cart-item');
      li.setAttribute('data-id', id);

      var ico = el('span', 'ico ico-' + id);
      ico.setAttribute('aria-hidden', 'true');

      var info = el('div', 'cart-item-info');
      var name = el('a', 'cart-item-name', p.name);
      name.href = p.href;
      info.appendChild(name);
      info.appendChild(el('span', 'cart-item-unit', money(p.cents) + ' per ' + p.unit));

      var qtyBox = el('div', 'qty');
      var minus = el('button', 'qty-btn', '\u2212');
      minus.type = 'button';
      minus.setAttribute('data-step', '-1');
      minus.setAttribute('aria-label', 'Decrease quantity of ' + p.name);
      var input = el('input', 'qty-input');
      input.type = 'number';
      input.min = '1';
      input.max = String(MAX);
      input.value = String(qty);
      input.setAttribute('inputmode', 'numeric');
      input.setAttribute('aria-label', 'Quantity of ' + p.name);
      var plus = el('button', 'qty-btn', '+');
      plus.type = 'button';
      plus.setAttribute('data-step', '1');
      plus.setAttribute('aria-label', 'Increase quantity of ' + p.name);
      qtyBox.appendChild(minus);
      qtyBox.appendChild(input);
      qtyBox.appendChild(plus);

      var total = el('strong', 'cart-item-total', money(p.cents * qty));

      var remove = el('button', 'btn btn-ghost cart-remove', 'Remove');
      remove.type = 'button';
      remove.setAttribute('aria-label', 'Remove ' + p.name + ' from cart');

      li.appendChild(ico);
      li.appendChild(info);
      li.appendChild(qtyBox);
      li.appendChild(total);
      li.appendChild(remove);
      return li;
    };

    var refresh = function () {
      var cart = read();
      var n = count(cart);
      var cents = totalCents(cart);
      if (n > 0) { ordered = false; }
      filledBox.hidden = n === 0;
      doneBox.hidden = !ordered;
      emptyBox.hidden = n > 0 || ordered;
      subtotalEl.textContent = money(cents);
      totalEl.textContent = money(cents);
      if (n > 0) {
        summary.textContent = 'You have ' + plural(n) + ' in your cart.';
      } else if (ordered) {
        summary.textContent = 'Your demo order is complete.';
      } else {
        summary.textContent = 'Add some fruit or vegetables to get started.';
      }
    };

    rebuild = function () {
      var cart = read();
      list.textContent = '';
      ORDER.forEach(function (id) {
        if (cart[id]) { list.appendChild(buildRow(id, cart[id])); }
      });
      refresh();
    };

    var setQty = function (id, value) {
      var qty = clampQty(value);
      var cart = read();
      cart[id] = qty;
      write(cart);
      var row = rowFor(id);
      if (row) {
        row.querySelector('.qty-input').value = String(qty);
        row.querySelector('.cart-item-total').textContent = money(CATALOG[id].cents * qty);
      }
      refresh();
      say(CATALOG[id].name + ' quantity set to ' + qty + '.');
    };

    var removeItem = function (id) {
      var row = rowFor(id);
      var neighbour = row ? (row.nextElementSibling || row.previousElementSibling) : null;
      var cart = read();
      delete cart[id];
      write(cart);
      if (row) { list.removeChild(row); }
      refresh();
      say(CATALOG[id].name + ' removed from cart.');
      var target = neighbour ? neighbour.querySelector('.cart-remove') : title;
      if (target) { target.focus(); }
    };

    list.addEventListener('click', function (e) {
      var btn = e.target.closest ? e.target.closest('button') : null;
      if (!btn || !list.contains(btn)) { return; }
      var row = btn.closest('.cart-item');
      if (!row) { return; }
      var id = row.getAttribute('data-id');
      if (!CATALOG[id]) { return; }
      if (btn.hasAttribute('data-step')) {
        var current = clampQty(row.querySelector('.qty-input').value);
        setQty(id, current + Number(btn.getAttribute('data-step')));
      } else if (btn.classList.contains('cart-remove')) {
        removeItem(id);
      }
    });
    list.addEventListener('change', function (e) {
      var input = e.target;
      if (!input.classList || !input.classList.contains('qty-input')) { return; }
      var row = input.closest('.cart-item');
      if (row && CATALOG[row.getAttribute('data-id')]) {
        setQty(row.getAttribute('data-id'), input.value);
      }
    });

    clearBtn.addEventListener('click', function () {
      if (!window.confirm('Remove all items from your cart?')) { return; }
      write({});
      rebuild();
      say('Your cart has been cleared.');
      if (title) { title.focus(); }
    });

    checkoutBtn.addEventListener('click', function () {
      var cart = read();
      var n = count(cart);
      if (n === 0) { return; }
      var cents = totalCents(cart);
      write({});
      ordered = true;
      doneText.textContent = 'Your demo order of ' + plural(n) + ' totalling ' + money(cents) + ' is complete. This is a demonstration, so no payment was taken and nothing will be delivered.';
      rebuild();
      say('');
      if (doneTitle) { doneTitle.focus(); }
    });

    rebuild();
  }

  /* Keep everything in sync across tabs and back/forward navigation */
  function sync() {
    updateBadge(read());
    if (rebuild) { rebuild(); }
  }
  window.addEventListener('storage', function (e) {
    if (e.key === KEY || e.key === null) { sync(); }
  });
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) { sync(); }
  });
})();
