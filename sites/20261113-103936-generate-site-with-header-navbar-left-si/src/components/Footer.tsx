export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className='footer'>
      <p>&copy; {year} Fresh Market. All rights reserved.</p>
      <p className='footer-note'>Demo site: all prices are placeholders, not real offers.</p>
    </footer>
  );
}
