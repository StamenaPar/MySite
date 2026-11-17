(() => {
  const main = document.getElementById('main');
  const id = new URLSearchParams(location.search).get('id');
  const p = window.SITE.products[id];
  if (!p) {
    document.title = 'Not found \u2013 My Site';
    main.innerHTML = '<h1>Item not found</h1><p>Please choose an item from the navigation.</p>';
    return;
  }
  const group = window.SITE.groups.find(g => g.id === p.group);
  document.title = `${p.name} \u2013 My Site`;
  const facts = p.facts.map(f => `<div><dt>${f[0]}</dt><dd>${f[1]}</dd></div>`).join('');
  main.innerHTML = `
    <p class="crumb">${group.name} / ${p.name}</p>
    <article class="product">
      <div class="product-icon">${window.SITE.icon(id, 160)}</div>
      <div class="product-body">
        <h1>${p.name}</h1>
        <p class="lead">${p.tagline}</p>
        <p class="price"><strong>$${p.price.toFixed(2)}</strong> <span>per ${p.unit}</span></p>
        <p>${p.desc}</p>
        <form class="add-row" id="add-form">
          <label for="qty">Quantity (${p.unit})</label>
          <input id="qty" type="number" min="1" max="99" value="1" inputmode="numeric">
          <button type="submit" class="btn">Add to cart</button>
          <a class="btn-link" href="cart.html">View cart</a>
        </form>
        <p id="add-status" class="status" role="status"></p>
      </div>
    </article>
    <h2>Characteristics</h2>
    <dl class="facts">${facts}</dl>`;

  const form = document.getElementById('add-form');
  const status = document.getElementById('add-status');
  form.addEventListener('submit', e => {
    e.preventDefault();
    let n = parseInt(document.getElementById('qty').value, 10);
    if (!n || n < 1) n = 1;
    window.CART.add(id, n);
    const inCart = window.CART.items()[id];
    status.textContent = `Added ${n} \u00d7 ${p.name}. You now have ${inCart} in your cart.`;
  });
})();
