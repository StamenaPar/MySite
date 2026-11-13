import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  useEffect(() => {
    document.title = 'Not found - Fresh Market';
  }, []);

  return (
    <div className='page'>
      <section className='hero'>
        <h1>Page not found</h1>
        <p>We could not find what you were looking for.</p>
        <p>
          <Link to='/' className='text-link'>
            Back to the overview
          </Link>
        </p>
      </section>
    </div>
  );
}
