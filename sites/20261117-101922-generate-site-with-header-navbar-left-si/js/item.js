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
      </div>
    </article>
    <h2>Characteristics</h2>
    <dl class="facts">${facts}</dl>`;
})();
