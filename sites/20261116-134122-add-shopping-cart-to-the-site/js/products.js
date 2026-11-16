(function () {
  'use strict';

  // Prices are in cents.
  var PRODUCTS = [
    { id: 'mug-oat', name: 'Oat Speckle Mug', desc: 'A roomy 12 oz mug with a matte oat glaze.', price: 2800, shape: 'mug', bg: '#efe3d2', fg: '#b08a5b' },
    { id: 'mug-moss', name: 'Moss Mug', desc: 'Deep green glaze, comfortable wide handle.', price: 3000, shape: 'mug', bg: '#e3ead9', fg: '#4f6f52' },
    { id: 'pot-terra', name: 'Terracotta Planter', desc: 'Breathable clay with a drainage hole. 5 inch.', price: 3400, shape: 'pot', bg: '#f3ddd0', fg: '#b4532a' },
    { id: 'pot-slate', name: 'Slate Planter', desc: 'Charcoal stoneware planter. 6 inch.', price: 3800, shape: 'pot', bg: '#e2e3e6', fg: '#4a4f5a' },
    { id: 'vase-bud', name: 'Bud Vase', desc: 'A rounded vase for a single stem or two.', price: 4200, shape: 'vase', bg: '#e6e0ee', fg: '#6f5a8f' },
    { id: 'vase-sand', name: 'Sand Vase', desc: 'Tall, unglazed outside, glossy inside.', price: 4600, shape: 'vase', bg: '#f1ead8', fg: '#a8905a' },
    { id: 'plate-sea', name: 'Sea Dinner Plate', desc: 'Pooling blue glaze on a 10 inch plate.', price: 2600, shape: 'plate', bg: '#dceaec', fg: '#3f7c88' },
    { id: 'plate-blush', name: 'Blush Side Plate', desc: 'Soft pink 7 inch plate for toast and cake.', price: 2200, shape: 'plate', bg: '#f6e1df', fg: '#c07a76' }
  ];

  var SHAPES = {
    mug: '<rect x="58" y="70" width="72" height="72" rx="10"/><path d="M130 86h12a16 16 0 0 1 0 32h-12" fill="none" stroke="currentColor" stroke-width="9"/>',
    pot: '<path d="M57 78h86l-12 68H69z"/><rect x="48" y="62" width="104" height="18" rx="5"/>',
    vase: '<path d="M85 45h30v22c22 14 30 34 30 50 0 22-18 36-45 36s-45-14-45-36c0-16 8-36 30-50z"/>',
    plate: '<ellipse cx="100" cy="108" rx="64" ry="24"/><ellipse cx="100" cy="104" rx="42" ry="13" fill="rgba(255,255,255,.35)"/>'
  };

  function art(p) {
    return '<svg viewBox="0 0 200 200" aria-hidden="true" focusable="false" fill="currentColor" style="background:' + p.bg + ';color:' + p.fg + '">' + SHAPES[p.shape] + '</svg>';
  }

  var money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
  function format(cents) { return money.format(cents / 100); }

  window.Shop = { PRODUCTS: PRODUCTS, art: art, format: format };

  var grid = document.getElementById('product-grid');
  if (grid) {
    grid.innerHTML = PRODUCTS.map(function (p) {
      return '<li class="card">' + art(p) +
        '<div class="card-body"><h3>' + p.name + '</h3><p>' + p.desc + '</p>' +
        '<p class="price">' + format(p.price) + '</p>' +
        '<button class="btn" type="button" data-add="' + p.id + '">Add to cart<span class="sr-only">: ' + p.name + '</span></button>' +
        '</div></li>';
    }).join('');
  }
})();
