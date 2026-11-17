(() => {
  const main = document.getElementById('main');
  const data = window.SITE;
  const money = n => '$' + n.toFixed(2);
  let notice = '';

  const render = () => {
    const items = Object.entries(window.CART.items()).filter(([id]) => data.products[id]);
    if (!items.length) {
      main.innerHTML = `<h1>Your cart</h1>${notice ? `<p class="status" role="status">${notice}</p>` : ''}<p>Your cart is empty. Pick something from the navigation on the left.</p>`;
      notice = '';
      return;
    }
    const rows = items.map(([id, q]) => {
      const p = data.products[id];
      return `<tr>
        <td><a class="cart-item" href="item.html?id=${id}"><span class="cart-ico">${data.icon(id, 40)}</span><span>${p.name}</span></a></td>
        <td class="num">${money(p.price)} / ${p.unit}</td>
        <td><label class="sr" for="q-${id}">Quantity of ${p.name}</label><input id="q-${id}" class="qty" type="number" min="1" max="99" value="${q}" data-id="${id}"></td>
        <td class="num">${money(p.price * q)}</td>
        <td><button type="button" class="link-btn" data-remove="${id}" aria-label="Remove ${p.name}">Remove</button></td>
      </tr>`;
    }).join('');
    main.innerHTML = `<h1>Your cart</h1>
      <div class="table-wrap"><table class="cart-table">
        <thead><tr><th scope="col">Item</th><th scope="col">Price</th><th scope="col">Quantity</th><th scope="col">Subtotal</th><th scope="col"><span class="sr">Actions</span></th></tr></thead>
        <tbody>${rows}</tbody>
        <tfoot><tr><th scope="row" colspan="3">Total</th><td class="num"><strong>${money(window.CART.total())}</strong></td><td></td></tr></tfoot>
      </table></div>
      <div class="cart-actions">
        <button type="button" class="btn" id="checkout">Checkout</button>
        <button type="button" class="btn secondary" id="clear">Empty cart</button>
      </div>`;
  };

  main.addEventListener('change', e => {
    const input = e.target.closest('.qty');
    if (!input) return;
    const n = parseInt(input.value, 10);
    window.CART.set(input.dataset.id, isNaN(n) ? 1 : n);
    render();
    const again = document.getElementById('q-' + input.dataset.id);
    if (again) again.focus();
  });
  main.addEventListener('click', e => {
    const rm = e.target.closest('[data-remove]');
    if (rm) { window.CART.remove(rm.dataset.remove); render(); main.focus(); return; }
    if (e.target.id === 'clear') { window.CART.clear(); render(); main.focus(); }
    if (e.target.id === 'checkout') {
      window.CART.clear();
      notice = 'Thank you! This is a demo shop, so no real order was placed.';
      render();
      main.focus();
    }
  });
  window.addEventListener('cart:change', () => { if (!main.contains(document.activeElement) || document.activeElement === main) render(); });
  render();
})();
