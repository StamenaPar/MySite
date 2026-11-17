(() => {
  const pages = [
    { href: 'index.html', label: 'Home' },
    { href: 'about.html', label: 'About' },
    { href: 'contact.html', label: 'Contact' }
  ];
  const current = document.body.dataset.page ||
    (location.pathname.split('/').pop() || 'index.html');
  const currentId = new URLSearchParams(location.search).get('id');
  const data = window.SITE;

  const skip = document.createElement('a');
  skip.className = 'skip';
  skip.href = '#main';
  skip.textContent = 'Skip to content';
  document.body.prepend(skip);

  const header = document.getElementById('site-header');
  if (header) {
    header.outerHTML = `<header class="site-header">
      <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden="true"><rect width="36" height="36" rx="8" fill="#fff"/><path d="M9 26V10l9 10 9-10v16" fill="none" stroke="#2456d6" stroke-width="3" stroke-linejoin="round"/></svg>
      <div><p class="title">My Site</p><p class="tag">Fresh fruit and vegetables</p></div>
    </header>`;
  }

  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } }
  };

  const nav = document.getElementById('site-nav');
  if (nav) {
    const top = pages.map(p =>
      `<li><a href="${p.href}"${p.href === current ? ' aria-current="page"' : ''}>${p.label}</a></li>`
    ).join('');
    let groupsHtml = '';
    if (data) {
      groupsHtml = data.groups.map(g => {
        const hasCurrent = current === 'item.html' && g.items.includes(currentId);
        const saved = store.get('nav-' + g.id);
        const open = hasCurrent || saved !== 'closed';
        const items = g.items.map(id => {
          const p = data.products[id];
          const isCur = current === 'item.html' && currentId === id;
          return `<li><a href="item.html?id=${id}"${isCur ? ' aria-current="page"' : ''}>${data.icon(id, 22)}<span>${p.name}</span></a></li>`;
        }).join('');
        return `<div class="group">
          <h2 class="group-h"><button type="button" class="group-btn" data-group="${g.id}" aria-expanded="${open}" aria-controls="g-${g.id}"><span>${g.name}</span><svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M3 5l4 4 4-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button></h2>
          <ul id="g-${g.id}" class="group-list"${open ? '' : ' hidden'}>${items}</ul>
        </div>`;
      }).join('');
    }
    nav.innerHTML = `<nav aria-label="Main"><ul class="top-list">${top}</ul>${groupsHtml}</nav>`;
    nav.addEventListener('click', e => {
      const btn = e.target.closest('.group-btn');
      if (!btn) return;
      const open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      document.getElementById(btn.getAttribute('aria-controls')).hidden = open;
      store.set('nav-' + btn.dataset.group, open ? 'closed' : 'open');
    });
  }

  const footer = document.getElementById('site-footer');
  if (footer) {
    footer.outerHTML = `<footer class="site-footer"><p>&copy; ${new Date().getFullYear()} My Site. All rights reserved.</p></footer>`;
  }
})();
