(() => {
 const pages = [
 { href: 'index.html', label: 'Home' },
 { href: 'about.html', label: 'About' },
 { href: 'contact.html', label: 'Contact' }
 ];
 const current = document.body.dataset.page ||
 (location.pathname.split('/').pop() || 'index.html');

 const skip = document.createElement('a');
 skip.className = 'skip';
 skip.href = '#main';
 skip.textContent = 'Skip to content';
 document.body.prepend(skip);

 const header = document.getElementById('site-header');
 if (header) {
 header.outerHTML = `<header class="site-header">
 <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden="true"><rect width="36" height="36" rx="8" fill="#fff"/><path d="M9 26V10l9 10 9-10v16" fill="none" stroke="#2456d6" stroke-width="3" stroke-linejoin="round"/></svg>
 <div><p class="title">My Site</p><p class="tag">A simple, clean starting point</p></div>
 </header>`;
 }

 const nav = document.getElementById('site-nav');
 if (nav) {
 const items = pages.map(p =>
 `<li><a href="${p.href}"${p.href === current ? ' aria-current="page"' : ''}>${p.label}</a></li>`
 ).join('');
 nav.innerHTML = `<nav aria-label="Main"><ul>${items}</ul></nav>`;
 }

 const footer = document.getElementById('site-footer');
 if (footer) {
 footer.outerHTML = `<footer class="site-footer"><p>&copy; ${new Date().getFullYear()} My Site. All rights reserved.</p></footer>`;
 }
})();
